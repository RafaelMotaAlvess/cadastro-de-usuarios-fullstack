import { InMemoryUsersRepository } from 'test'
import { it, beforeEach, describe, expect, vi } from 'vitest'
import { FindUsersByCreatedAtUseCase } from './find-user-by-created-at.usecase'

let usersRepository: InMemoryUsersRepository
let sut: FindUsersByCreatedAtUseCase

describe("Find Users  By Created At Usecase", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new FindUsersByCreatedAtUseCase(usersRepository)
  })

  it("should be able to get users with same date", async () => {
    vi.useFakeTimers();

    for (let i = 0; i < 3; i++) {
      await usersRepository.create({
        name: "Rafael Mota Alves",
        email: `rafaelmotalaves${i}@gmail.com`,
        phone: `10101010100${i}`
      });
    }

    vi.setSystemTime(new Date().getTime() + (24 * 60 * 60 * 1000))

    await usersRepository.create({
      name: "Salmao Dourado",
      email: "salmaodourado@gmail.com",
      phone: "23923984223",
    })

    vi.useRealTimers()

    const date = new Date()

    const { users } = await sut.execute({ date })

    expect(users).toHaveLength(3)
  })
})