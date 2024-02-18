import { PrismaUsersRepository } from "../../repositories";
import { FetchUsersUseCase } from "../fetch-users.usecase";

export function makeFetchUsersUsecase() {
  const usersRepository = new PrismaUsersRepository()
  const usecase = new FetchUsersUseCase(
    usersRepository,
  )

  return usecase
}