import {
  CreateUserRepository,
  FindByUserEmailRepository,
  FindByUserPhoneRepository
} from "../repositories";

import {
  EmailAlreadyExistsError,
  PhoneAlreadyExistsError
} from "./errors";

import { User } from "../models"


export interface CreateUserUseCaseRequest {
  name: string;
  email: string;
  phone: string;
}

interface CreateUserUseCaseResponse {
  user: User
}


export class CreateUserUseCase {
  constructor(
    private createUserRepository: CreateUserRepository,
    private findByUserEmailRepository: FindByUserEmailRepository,
    private findByUserPhoneRepository: FindByUserPhoneRepository
  ) { }

  async execute({
    name,
    email,
    phone
  }: CreateUserUseCaseRequest): Promise<CreateUserUseCaseResponse> {
    const userWithSameEmail = await this.findByUserEmailRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new EmailAlreadyExistsError();
    }

    const userWithSamePhone = await this.findByUserPhoneRepository.findByPhone(phone)

    if (userWithSamePhone) {
      throw new PhoneAlreadyExistsError();
    }

    const user = await this.createUserRepository.create({
      name,
      email,
      phone
    })

    return {
      user
    }
  }
}