import { PrismaUsersRepository } from "../../repositories";
import { FetchUsersByPeriodUseCase } from "../fetch-users-by-period.usecase";

export function makeFetchUsersByPeriodUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const usecase = new FetchUsersByPeriodUseCase(
    usersRepository,
  )

  return usecase
}