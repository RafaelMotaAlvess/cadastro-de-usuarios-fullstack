import { EmailAlreadyExistsError, PhoneAlreadyExistsError } from "@/usecases/errors";
import { makeCreateUserUsecase } from "../../../usecases/factories";
import { FastifyRequest, FastifyReply } from "fastify";
import validator from "validator";
import { z } from "zod";

export async function createUser(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string().min(3),
    email: z.string().email(),
    phone: z.string().refine(validator.isMobilePhone)
  });

  const { name, email, phone } = registerBodySchema.parse(request.body);

  try {
    const creeteUserUsecase = makeCreateUserUsecase();

    await creeteUserUsecase.execute({
      name,
      email,
      phone,
    });
  } catch (error) {
    if (error instanceof EmailAlreadyExistsError) {
      return reply.status(409).send({ message: error.message });
    }

    if (error instanceof PhoneAlreadyExistsError) {
      return reply.status(409).send({ message: error.message });
    }
  }

  return reply.status(201).send({
    name,
    email,
    phone
  });
}