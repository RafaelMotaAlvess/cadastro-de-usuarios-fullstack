import { InMemoryUsersRepository } from 'test'
import { it, beforeEach, describe, expect } from 'vitest'
import { FetchUsersUseCase } from './fetch-users.usecase'

let usersRepository: InMemoryUsersRepository
let sut: FetchUsersUseCase

describe("Fetch Users Usecase", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new FetchUsersUseCase(usersRepository)
  })

  it("should be able to fetch users", async () => {
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

    const { users } = await sut.execute()

    expect(users).toHaveLength(2)
    expect(users).toEqual([
      expect.objectContaining({ email: "rafaelmotalaves@gmail.com" }),
      expect.objectContaining({ email: "carlinhos@gmail.com" }),
    ])

  })
})