import { format } from "date-fns";
import { User } from "../../src/models";
import {
  CreateUserRepository,
  DeleteUserRepository,
  FetchUserRepository,
  FetchUsersByCreatedAtAscRepository,
  FetchUsersByCreatedAtDescRepository,
  FetchUsersByCreatedAtRepository,
  FetchUsersByPeriodRepository,
  FindByUserEmailRepository,
  FindByUserPhoneRepository,
  UpdateUserRepository
} from "../../src/repositories";
import { randomUUID } from "crypto";


type CreateParams = {
  name: string;
  email: string;
  phone: string;
}

export class InMemoryUsersRepository implements
  CreateUserRepository,
  DeleteUserRepository,
  FetchUserRepository,
  FetchUsersByCreatedAtRepository,
  FetchUsersByCreatedAtAscRepository,
  FetchUsersByCreatedAtDescRepository,
  FetchUsersByPeriodRepository,
  UpdateUserRepository,
  FindByUserEmailRepository,
  FindByUserPhoneRepository {

  public items: User[] = []

  async create(user: CreateParams): Promise<User> {
    const newUser = new User(
      {
        id: randomUUID(),
        name: user.name,
        email: user.email,
        phone: user.phone,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null
      }
    )
    this.items.push(newUser)
    return newUser
  }

  async delete(id: string) {
    const user = this.items.find(user => user.id === id)

    if (user) {
      user.deletedAt = new Date()
    }
  }

  async fetchUsers() {
    return this.items
  }

  async findByEmail(email: string) {
    const foundUser = this.items.find(user => user.email === email)
    return !!foundUser
  }

  async findByPhone(phone: string) {
    return !!this.items.find(user => user.phone === phone)
  }

  async update(id: string, data: {
    name?: string,
    email?: string,
    phone?: string
  }) {
    const user = this.items.find(user => user.id === id) as User

    if (user) {
      if (data.name) {
        user.name = data.name
      }

      if (data.email) {
        user.email = data.email
      }

      if (data.phone) {
        user.phone = data.phone
      }
    }
    return user
  }

  async fetchUsersByCreatedAt(date: Date): Promise<User[]> {
    const formatedDate = format(date, "yyyy-MM-dd")
    const users = this.items.filter(user => format(user.createdAt, "yyyy-MM-dd") === formatedDate)
    return users
  }

  async fetchUsersByCreatedAtAsc(): Promise<User[]> {
    const users = this.items.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime())

    return users
  }

  async fetchUsersByCreatedAtDesc(): Promise<User[]> {
    const users = this.items.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())

    return users
  }

  async fetchUsersByPeriod(start: Date, end: Date): Promise<User[]> {
    const users = this.items.filter(user => user.createdAt >= start && user.createdAt <= end)

    return users
  }
}