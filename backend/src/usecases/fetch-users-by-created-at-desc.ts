import { FetchUsersByCreatedAtDescRepository } from "../repositories";

export class FetchUsersByCreatedAtDescUseCase {
  constructor(
    private fetchUsersByCreatedAtDescRepository: FetchUsersByCreatedAtDescRepository,
  ) { }

  async execute() {
    const users = await this.fetchUsersByCreatedAtDescRepository.fetchUsersByCreatedAtDesc()

    return {
      users
    }
  }
}
