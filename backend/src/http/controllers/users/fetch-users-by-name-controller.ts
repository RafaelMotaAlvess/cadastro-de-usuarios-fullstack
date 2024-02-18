import { makeFetchUsersByNameUsecase } from "@/usecases/factories/make-fetch-users-by-name-usecase";
import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";

export async function fetchUsersByName(request: FastifyRequest, reply: FastifyReply) {
  const fetchUsersByNameParamsSchema = z.object({
    name: z.string()
  })

  try {
    const fetchUsersByNameUsecase = makeFetchUsersByNameUsecase();

    const { name } = fetchUsersByNameParamsSchema.parse(request.params);

    const users = await fetchUsersByNameUsecase.execute({ name });

    return reply.status(200).send(users);
  } catch (_) {
    return reply.status(404).send([]);
  }
}