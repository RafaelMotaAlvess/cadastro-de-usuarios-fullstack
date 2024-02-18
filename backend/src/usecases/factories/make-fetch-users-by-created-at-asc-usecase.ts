import { PrismaUsersRepository } from "../../repositories";
import { FetchUsersByCreatedAtAscUseCase } from "../fetch-users-by-created-at-asc.usecase";

export function makeFetchUsersByCreatedAtAscUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const usecase = new FetchUsersByCreatedAtAscUseCase(
    usersRepository,
  )

  return usecase
}