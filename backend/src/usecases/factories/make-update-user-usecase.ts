import { PrismaUsersRepository } from "../../repositories";
import { UpdateUserUseCase } from "../update-user.usecase";

export function makeUpdateUserUsecase() {
  const usersRepository = new PrismaUsersRepository()

  const usecase = new UpdateUserUseCase(
    usersRepository,
    usersRepository,
    usersRepository,
  )

  return usecase
}