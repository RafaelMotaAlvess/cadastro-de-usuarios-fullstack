import { PrismaUsersRepository } from "../../repositories";
import { FetchUsersByCreatedAtDescUseCase } from "../fetch-users-by-created-at-desc.usecase";

export function makeFetchUsersByCreatedAtDescUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const usecase = new FetchUsersByCreatedAtDescUseCase(
    usersRepository,
  )

  return usecase
}