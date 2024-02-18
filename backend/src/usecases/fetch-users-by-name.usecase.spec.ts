import { InMemoryUsersRepository } from 'test'
import { it, beforeEach, describe, expect } from 'vitest'
import { FetchUsersByNameUsecase } from './fetch-users-by-name.usecase'

let usersRepository: InMemoryUsersRepository
let sut: FetchUsersByNameUsecase

describe("Fetch Users By Name Usecase", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new FetchUsersByNameUsecase(usersRepository)
  })

  it("should be able to fetch users by name", async () => {
    await usersRepository.create({
      name: "Rafael Mota Alves",
      email: "rafaelmotalaves@gmail.com",
      phone: "101010101001"
    })

    await usersRepository.create({
      name: "Carlinhos Astuto",
      email: "carlinhos@gmail.com",
      phone: "3224234324"
    })

    const { users } = await sut.execute({
      name: 'rafa',
    })

    expect(users).toHaveLength(1)
    expect(users).toEqual([
      expect.objectContaining({ email: "rafaelmotalaves@gmail.com" }),
    ])
  })
})