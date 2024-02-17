import { FindUsersByCreatedAtRepository } from "../repositories";

export interface FindUsersByCreatedAtRequest {
  date: Date
}

export class FindUsersByCreatedAtUseCase {
  constructor(
    private findUsersByCreatedAtRepository: FindUsersByCreatedAtRepository,
  ) { }

  async execute({ date }: FindUsersByCreatedAtRequest) {
    const users = await this.findUsersByCreatedAtRepository.findUsersByCreatedAt(date)

    return {
      users
    }
  }
}
