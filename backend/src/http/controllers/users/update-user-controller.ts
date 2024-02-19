import { EmailAlreadyExistsError, PhoneAlreadyExistsError } from "../../../usecases/errors";
import { makeUpdateUserUsecase } from "../../../usecases/factories";
import { FastifyRequest, FastifyReply } from "fastify";
import validator from "validator";
import parsePhoneNumberFromString from "libphonenumber-js";
import { ZodError, z } from "zod";

export async function updateUser(request: FastifyRequest, reply: FastifyReply) {
  const updateUserParamsSchema = z.object({
    userId: z.string().uuid()
  })

  const updateUserBodySchema = z.object({
    name: z.string().min(3).optional(),
    email: z.string().email().or(z.string().length(0)).optional(),
    phone: z.string().refine(validator.isMobilePhone).or(z.string().length(0)).optional()
  });

  try {
    const parsedBody = updateUserBodySchema.parse(request.body);
    const name = parsedBody.name ? parsedBody.name : undefined;
    const email = parsedBody.email ? parsedBody.email : undefined;
    const phone = parsedBody.phone ? parsedBody.phone : undefined;

    const { userId } = updateUserParamsSchema.parse(request.params);

    const updateUserUsecase = makeUpdateUserUsecase();

    let formatedPhone: string | undefined

    if (phone) {
      if (phone.startsWith('55')) {
        phone.replace('55', '')
      }

      const parsedPhoneNumber = parsePhoneNumberFromString(phone.replace(/\D/g, ''), 'BR')
      formatedPhone = parsedPhoneNumber?.formatInternational().replace(/\D/g, '')
    }

    await updateUserUsecase.execute(userId, {
      name,
      email,
      phone: formatedPhone,
    });

    return reply.status(204).send();

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