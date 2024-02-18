import { PrismaUsersRepository } from "../../repositories";
import { DeleteUserUseCase } from "../delete-user.usecase";

export function makeDeleteUserUsecase() {
  const usersRepository = new PrismaUsersRepository()
  const usecase = new DeleteUserUseCase(
    usersRepository,
  )

  return usecase
}