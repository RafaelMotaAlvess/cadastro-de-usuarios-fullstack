import { FetchUserRepository } from "../repositories";

export class FetchUsersUseCase {
  constructor(
    private fetchUserRepository: FetchUserRepository,
  ) { }

  async execute() {
    const users = await this.fetchUserRepository.fetchUsers()

    return {
      users
    }
  }
}