import { FetchUsersByCreatedAtRepository } from "../repositories";

export interface FetchUsersByCreatedAtUseCaseRequest {
  date: Date
}

export class FetchUsersByCreatedAtUseCase {
  constructor(
    private fetchUsersByCreatedAtRepository: FetchUsersByCreatedAtRepository,
  ) { }

  async execute({ date }: FetchUsersByCreatedAtUseCaseRequest) {
    const users = await this.fetchUsersByCreatedAtRepository.fetchUsersByCreatedAt(date)

    return {
      users
    }
  }
}
