import { PrismaUsersRepository } from "../../repositories";
import { FetchUsersByNameUsecase } from "../fetch-users-by-name.usecase";

export function makeFetchUsersByNameUsecase() {
  const usersRepository = new PrismaUsersRepository()
  const usecase = new FetchUsersByNameUsecase(
    usersRepository,
  )

  return usecase
}