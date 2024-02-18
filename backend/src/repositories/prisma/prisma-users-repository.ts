import { User } from "../../models";
import { prisma } from '../../lib'
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
} from "../";

export class PrismaUsersRepository implements
  CreateUserRepository,
  DeleteUserRepository,
  UpdateUserRepository,
  FetchUserRepository,
  FetchUsersByCreatedAtAscRepository,
  FetchUsersByCreatedAtDescRepository,
  FetchUsersByPeriodRepository,
  FindByUserEmailRepository,
  FindByUserPhoneRepository,
  FetchUsersByCreatedAtRepository {

  async create(data: { name: string; email: string; phone: string; }): Promise<User> {
    const user = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone
      }
    })

    return user
  }

  async delete(id: string) {
    await prisma.user.update({
      where: {
        id
      },

      data: {
        deletedAt: new Date()
      }
    })
  }

  async update(id: string, data: { name: string; email: string; phone: string; }): Promise<User> {
    const user = await prisma.user.update({
      where: {
        id
      },
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone
      }
    })

    return user
  }

  async fetchUsers(): Promise<User[]> {
    const users = await prisma.user.findMany()

    return users
  }

  async fetchUsersByCreatedAtAsc(): Promise<User[]> {
    const users = await prisma.user.findMany({
      orderBy: {
        createdAt: 'asc'
      }
    })

    return users
  }

  async fetchUsersByCreatedAtDesc(): Promise<User[]> {
    const users = await prisma.user.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    })

    return users
  }
  async fetchUsersByPeriod(startDate: Date, endDate: Date): Promise<User[]> {
    const users = await prisma.user.findMany({
      where: {
        createdAt: {
          gte: startDate,
          lte: endDate,
        },
      },
    });

    return users;
  }

  async findByEmail(email: string): Promise<boolean> {
    const user = await prisma.user.findUnique({
      where: {
        email,
      }
    })

    return !!user
  }

  async findByPhone(phone: string): Promise<boolean> {
    const user = await prisma.user.findUnique({
      where: {
        phone,
      }
    })

    return !!user
  }

  async fetchUsersByCreatedAt(date: Date): Promise<User[]> {
    const users = await prisma.user.findMany({
      where: {
        createdAt: date
      }
    })

    return users
  }
}