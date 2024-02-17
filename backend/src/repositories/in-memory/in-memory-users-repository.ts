import { User } from "../../models";
import {
  CreateUserRepository,
  DeleteUserRepository,
  FetchUserRepository,
  FindByUserEmailRepository,
  FindByUserPhoneRepository,
  UpdateUserRepository
} from "../";


export class InMemoryUsersRepository implements
  CreateUserRepository,
  DeleteUserRepository,
  FetchUserRepository,
  UpdateUserRepository,
  FindByUserEmailRepository,
  FindByUserPhoneRepository {

  public items: User[] = []

  async create(user: User) {
    this.items.push(user)
    return user
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
    return !!this.items.find(user => user.email === email)
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