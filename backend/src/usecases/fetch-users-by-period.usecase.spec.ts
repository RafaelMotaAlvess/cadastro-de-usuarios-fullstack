import { InMemoryUsersRepository } from 'test'
import { it, beforeEach, describe, expect, vi } from 'vitest'
import { FetchUsersByPeriodUseCase } from './fetch-users-by-period.usecase'


let usersRepository: InMemoryUsersRepository
let sut: FetchUsersByPeriodUseCase

describe("Find Users By Period Usecase", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new FetchUsersByPeriodUseCase(usersRepository)
  })

  it("should be fetch users in period of two dates", async () => {
    vi.useFakeTimers();

    const currentTime = new Date().getTime()

    for (let i = 1; i <= 4; i++) {
      const timeOffset = i * (24 * 60 * 60 * 1000)
      vi.setSystemTime(currentTime + timeOffset)

      await usersRepository.create({
        name: "Rafael Mota Alves",
        email: `rafaelmotalaves${i}@gmail.com`,
        phone: `10101010100${i}`
      });
    }

    vi.setSystemTime(currentTime + (24 * 60 * 60 * 1000));

    const startDate = new Date()
    const endDate = new Date(currentTime + (4 * 24 * 60 * 60 * 1000))

    vi.useRealTimers()

    const userBeforePeriod = {
      name: "User Before Start Date",
      email: "before@example.com",
      phone: "1234567890"
    };

    await usersRepository.create(userBeforePeriod);

    const { users } = await sut.execute({
      startDate,
      endDate
    })

    expect(users).toHaveLength(4)
  })
})