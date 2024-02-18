import { z } from "zod";
import { makeFetchUsersByCreatedAtUseCase } from "../../../usecases/factories";
import { FastifyRequest, FastifyReply } from "fastify";

export async function fetchUsersByCreatedAt(request: FastifyRequest, reply: FastifyReply) {
  const fetchUsersByCreatedAtParamsSchema = z.object({
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/)
  })

  try {
    const { date } = fetchUsersByCreatedAtParamsSchema.parse(request.params);

    const dateToSend = new Date(date);

    const fetchUsersUsecase = makeFetchUsersByCreatedAtUseCase();

    const users = await fetchUsersUsecase.execute({ date: dateToSend });

    return reply.status(200).send(users);
  } catch (_) {
    return reply.status(404).send([]);
  }

}