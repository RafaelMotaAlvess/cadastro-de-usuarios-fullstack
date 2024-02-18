import {
  FindByUserEmailRepository,
  FindByUserPhoneRepository,
  UpdateUserRepository
} from "../repositories";

import {
  EmailAlreadyExistsError,
  PhoneAlreadyExistsError
} from "./errors";

import { User } from "../models"


export interface UpdateUserUseCaseRequest {
  name?: string;
  email?: string;
  phone?: string;
}

interface UpdateUserUseCaseResponse {
  user: User
}


export class UpdateUserUseCase {
  constructor(
    private updateUserRepository: UpdateUserRepository,
    private findByUserEmailRepository: FindByUserEmailRepository,
    private findByUserPhoneRepository: FindByUserPhoneRepository
  ) { }

  async execute(id: string, {
    name,
    email,
    phone
  }: UpdateUserUseCaseRequest): Promise<UpdateUserUseCaseResponse> {

    if (email) {
      const userWithSameEmail = await this.findByUserEmailRepository.findByEmail(email)

      if (userWithSameEmail) {
        throw new EmailAlreadyExistsError()
      }
    }

    if (phone) {
      const userWithSamePhone = await this.findByUserPhoneRepository.findByPhone(phone)

      if (userWithSamePhone) {
        throw new PhoneAlreadyExistsError();
      }
    }

    const user = await this.updateUserRepository.update(id, {
      name,
      email,
      phone
    })

    return {
      user
    }
  }
}