import { makeFetchUsersUsecase } from "../../../usecases/factories";
import { FastifyRequest, FastifyReply } from "fastify";

export async function fetchUsers(_: FastifyRequest, reply: FastifyReply) {
  const fetchUsersUsecase = makeFetchUsersUsecase();

  const users = await fetchUsersUsecase.execute();

  return reply.status(200).send(users);
}