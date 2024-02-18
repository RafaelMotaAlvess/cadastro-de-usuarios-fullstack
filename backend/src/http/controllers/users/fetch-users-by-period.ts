import { z } from "zod";
import { makeFetchUsersByPeriodUseCase } from "../../../usecases/factories";
import { FastifyRequest, FastifyReply } from "fastify";

export async function fetchUsersByPeriod(request: FastifyRequest, reply: FastifyReply) {
  const fetchUsersByCreatedAtQuerySchema = z.object({
    startDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    endDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/)
  })

  try {
    const { startDate, endDate } = fetchUsersByCreatedAtQuerySchema.parse(request.query);

    const startDateToSend = new Date(startDate);
    const endDateToSend = new Date(endDate);


    const fetchUsersUsecase = makeFetchUsersByPeriodUseCase();

    const users = await fetchUsersUsecase.execute({
      startDate: startDateToSend,
      endDate: endDateToSend
    });

    return reply.status(200).send(users);
  } catch (_) {
    return reply.status(404).send([]);
  }

}