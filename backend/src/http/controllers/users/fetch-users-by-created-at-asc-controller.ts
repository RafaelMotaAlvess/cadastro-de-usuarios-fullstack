import { makeFetchUsersByCreatedAtAscUseCase } from "../../../usecases/factories";
import { FastifyRequest, FastifyReply } from "fastify";

export async function fetchUsersByCreatedAtAsc(_: FastifyRequest, reply: FastifyReply) {
  const fetchUsersByCreatedAtAscUsecase = makeFetchUsersByCreatedAtAscUseCase();

  const users = await fetchUsersByCreatedAtAscUsecase.execute();

  return reply.status(200).send(users);
}