import { EmailAlreadyExistsError, PhoneAlreadyExistsError } from "../../../usecases/errors";
import { makeCreateUserUsecase } from "../../../usecases/factories";
import { FastifyRequest, FastifyReply } from "fastify";
import validator from "validator";
import parsePhoneNumberFromString from "libphonenumber-js";
import { ZodError, z } from "zod";

export async function createUser(request: FastifyRequest, reply: FastifyReply) {
  const createUserBodySchema = z.object({
    name: z.string().min(3),
    email: z.string().email(),
    phone: z.string().refine(validator.isMobilePhone)
  });

  try {
    const { name, email, phone } = createUserBodySchema.parse(request.body);

    const createUserUseCase = makeCreateUserUsecase();

    const parsedPhoneNumber = parsePhoneNumberFromString(phone.replace(/\D/g, ''), 'BR')
    const formatedPhone = parsedPhoneNumber?.formatInternational().replace(/\D/g, '')

    if (formatedPhone) {
      const user = await createUserUseCase.execute({
        name,
        email,
        phone: formatedPhone,
      });

      return reply.status(201).send({
        userId: user.user.id,
        name,
        email,
        phone: formatedPhone,
      });
    }

    return reply.status(400).send({ message: "Invalid phone number" });

  } catch (error) {
    if (error instanceof EmailAlreadyExistsError) {
      return reply.status(409).send({ message: error.message });
    }

    if (error instanceof PhoneAlreadyExistsError) {
      return reply.status(409).send({ message: error.message });
    }

    if (error instanceof ZodError) {
      return reply.status(400).send({
        message: error.errors
      });
    }
  }
}