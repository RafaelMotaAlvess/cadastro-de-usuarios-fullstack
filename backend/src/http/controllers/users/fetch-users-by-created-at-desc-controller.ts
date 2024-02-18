import { makeFetchUsersByCreatedAtDescUseCase } from "../../../usecases/factories";
import { FastifyRequest, FastifyReply } from "fastify";

export async function fetchUsersByCreatedAtDesc(_: FastifyRequest, reply: FastifyReply) {
  const fetchUsersByCreatedAtDscUsecase = makeFetchUsersByCreatedAtDescUseCase();

  const users = await fetchUsersByCreatedAtDscUsecase.execute();

  return reply.status(200).send(users);
}