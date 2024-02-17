import { InMemoryUsersRepository } from 'test'
import { it, beforeEach, describe, expect } from 'vitest'
import { EmailAlreadyExistsError, PhoneAlreadyExistsError } from './errors'
import { UpdateUserUseCase } from './update-user.usecase'
import { randomUUID } from 'crypto'
import { CreateUserUseCase } from './create-user.usecase'

let usersRepository: InMemoryUsersRepository
let createUserUseCase: CreateUserUseCase
let sut: UpdateUserUseCase

describe("Update User Usecase", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new UpdateUserUseCase(usersRepository, usersRepository, usersRepository)
    createUserUseCase = new CreateUserUseCase(usersRepository, usersRepository, usersRepository)
  })

  it("should be able to update a user", async () => {
    const createdUser = await usersRepository.create({
      name: "Rafael Mota Alves",
      email: "rafaelmotalaves@gmail.com",
      phone: "101010101001"
    })

    const { user } = await sut.execute(createdUser.id, {
      email: "lucasmarques@gmail.com",
    })

    expect(user.email).toEqual("lucasmarques@gmail.com")
  })
})