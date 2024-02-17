import { InMemoryUsersRepository } from 'test'
import { it, beforeEach, describe, expect } from 'vitest'
import { CreateUserUseCase } from './create-user.usecase'
import { EmailAlreadyExistsError, PhoneAlreadyExistsError } from './errors'

let usersRepository: InMemoryUsersRepository
let sut: CreateUserUseCase

describe("Create User Usecase", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new CreateUserUseCase(usersRepository, usersRepository, usersRepository)
  })

  it("should be able to create a new user", async () => {
    const { user } = await sut.execute({
      name: "Rafael Mota Alves",
      email: "rafaelmotalaves@gmail.com",
      phone: "101010101001"
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it("should not be able to create a new user with the same email", async () => {
    const email = "email@gmail.com"

    await sut.execute({
      name: "Rafael Mota Alves",
      email,
      phone: "101010201001"
    })

    expect(async () => {
      await sut.execute({
        name: "Rafael Mota Alves",
        email,
        phone: "101010201001"
      })
    }).rejects.toBeInstanceOf(EmailAlreadyExistsError)
  })

  it("should not be able to create a new user with the same email", async () => {
    const phone = "21312312323"

    await sut.execute({
      name: "Rafael Mota Alves",
      email: 'test1@gmail.com',
      phone,
    })

    expect(async () => {
      await sut.execute({
        name: "Rafael Mota Alves",
        email: 'test2@gmail.com',
        phone,
      })
    }).rejects.toBeInstanceOf(PhoneAlreadyExistsError)
  })
})