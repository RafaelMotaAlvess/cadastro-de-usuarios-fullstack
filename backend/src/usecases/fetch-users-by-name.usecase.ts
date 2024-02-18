import { FetchUsersByCreatedAtRepository, FetchUsersByNameRepository } from "../repositories";

export interface FetchUsersByNameUsecaseRequest {
  name: string
}

export class FetchUsersByNameUsecase {
  constructor(
    private fetchUsersByNameRepository: FetchUsersByNameRepository,
  ) { }

  async execute({ name }: FetchUsersByNameUsecaseRequest) {
    const users = await this.fetchUsersByNameRepository.fetchUsersByName(name)

    return {
      users
    }
  }
}
