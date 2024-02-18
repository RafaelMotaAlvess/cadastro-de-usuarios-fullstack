import { FetchUsersByCreatedAtAscRepository } from "../repositories";

export class FetchUsersByCreatedAtAscUseCase {
  constructor(
    private fetchUsersByCreatedAtAscRepository: FetchUsersByCreatedAtAscRepository,
  ) { }

  async execute() {
    const users = await this.fetchUsersByCreatedAtAscRepository.fetchUsersByCreatedAtAsc()

    return {
      users
    }
  }
}
