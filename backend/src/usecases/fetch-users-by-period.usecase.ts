import { FetchUsersByPeriodRepository } from "../repositories";


export interface FetchUsersByPeriodUseCaseRequest {
  startDate: Date
  endDate: Date
}


export class FetchUsersByPeriodUseCase {
  constructor(
    private fetchUsersByPeriodRepository: FetchUsersByPeriodRepository,
  ) { }

  async execute({ startDate, endDate }: FetchUsersByPeriodUseCaseRequest) {
    const users = await this.fetchUsersByPeriodRepository.fetchUsersByPeriod(startDate, endDate)

    return {
      users
    }
  }
}
