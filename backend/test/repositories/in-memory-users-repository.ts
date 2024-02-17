import { User } from "../../src/models";
import {
  CreateUserRepository,
  DeleteUserRepository,
  FetchUserRepository,
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
}