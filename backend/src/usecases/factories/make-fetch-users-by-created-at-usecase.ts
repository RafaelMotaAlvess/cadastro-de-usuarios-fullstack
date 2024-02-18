import { PrismaUsersRepository } from "../../repositories";
import { FetchUsersByCreatedAtUseCase } from "../fetch-users-by-created-at.usecase";

export function makeFetchUsersByCreatedAtUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const usecase = new FetchUsersByCreatedAtUseCase(
    usersRepository,
  )

  return usecase
}