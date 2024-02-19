import { z } from "zod";
import { makeDeleteUserUsecase } from "../../../usecases/factories";
import { FastifyRequest, FastifyReply } from "fastify";

export async function deleteUser(request: FastifyRequest, reply: FastifyReply) {
  const deleteUserParamsSchema = z.object({
    userId: z.string().uuid()
  })

  try {
    const { userId } = deleteUserParamsSchema.parse(request.params);

    const fetchUsersUsecase = makeDeleteUserUsecase();

    await fetchUsersUsecase.execute({
      id: userId
    });

    return reply.status(204).send();
  } catch (_) {
    return reply.status(404).send({ message: 'Usuario Nao Encontrado' });
  }
}