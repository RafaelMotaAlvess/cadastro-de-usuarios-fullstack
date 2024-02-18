import { InMemoryUsersRepository } from 'test'
import { it, beforeEach, describe, expect, vi } from 'vitest'
import { FetchUsersByCreatedAtDescUseCase } from './fetch-users-by-created-at-desc.usecase'

let usersRepository: InMemoryUsersRepository
let sut: FetchUsersByCreatedAtDescUseCase

describe("Find Users  By Created At Usecase", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new FetchUsersByCreatedAtDescUseCase(usersRepository)
  })

  it("should be fetch users order by date (desc)", async () => {
    vi.useFakeTimers();

    const currentTime = new Date().getTime()

    for (let i = 1; i < 3; i++) {
      const timeOffset = i * (24 * 60 * 60 * 1000) // ! day
      vi.setSystemTime(currentTime + timeOffset)
      await usersRepository.create({
        name: "Rafael Mota Alves",
        email: `rafaelmotalaves${i}@gmail.com`,
        phone: `10101010100${i}`
      });
    }

    vi.useRealTimers()

    const { users } = await sut.execute()

    expect(users).toHaveLength(2)
    expect(users[0]).toEqual(expect.objectContaining({ email: "rafaelmotalaves2@gmail.com" }))
    expect(users[1]).toEqual(expect.objectContaining({ email: "rafaelmotalaves1@gmail.com" }))
  })
})