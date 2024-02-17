import { InMemoryUsersRepository } from 'test'
import { it, beforeEach, describe, expect } from 'vitest'
import { DeleteUserUseCase } from './delete-user.usecase'

let usersRepository: InMemoryUsersRepository
let sut: DeleteUserUseCase

describe("Delete User Usecase", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new DeleteUserUseCase(usersRepository)
  })

  it("should be able to delete a user", async () => {
    const createdUser = await usersRepository.create({
      name: "Rafael Mota Alves",
      email: "rafaelmotalaves@gmail.com",
      phone: "101010101001"
    })

    await sut.execute({ id: createdUser.id });

    expect(usersRepository.items[0].deletedAt).toEqual(expect.any(Date))
  })
})