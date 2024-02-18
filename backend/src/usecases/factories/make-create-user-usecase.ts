import { PrismaUsersRepository } from "../../repositories";
import { CreateUserUseCase } from "../create-user.usecase";

export function makeCreateUserUsecase() {
  const usersRepository = new PrismaUsersRepository()
  const usecase = new CreateUserUseCase(
    usersRepository,
    usersRepository,
    usersRepository
  )

  return usecase
}