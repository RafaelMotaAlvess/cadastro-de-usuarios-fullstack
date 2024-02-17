import { DeleteUserRepository } from "../repositories";

export interface DeleteUserUseCaseRequest {
  id: string
}

export class DeleteUserUseCase {
  constructor(
    private deleteUserRepository: DeleteUserRepository,
  ) { }

  async execute({ id }: DeleteUserUseCaseRequest): Promise<void> {
    await this.deleteUserRepository.delete(id)
  }
}