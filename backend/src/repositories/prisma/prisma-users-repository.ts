import { User } from "../../models";
import { prisma } from '../../lib'
import {
  CreateUserRepository,
  DeleteUserRepository,
  FetchUserRepository,
  FetchUsersByCreatedAtAscRepository,
  FetchUsersByCreatedAtDescRepository,
  FetchUsersByCreatedAtRepository,
  FetchUsersByNameRepository,
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
  FetchUsersByNameRepository,
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
        id,
        deletedAt: null
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
    const users = await prisma.user.findMany({
      where: {
        deletedAt: null
      }
    })

    return users
  }

  async fetchUsersByName(name: string): Promise<User[]> {
    const users = await prisma.user.findMany({
      where: {
        name: {
          mode: 'insensitive',
          contains: name,
        },
        deletedAt: null,
      },
    });

    return users;
  }

  async fetchUsersByCreatedAtAsc(): Promise<User[]> {
    const users = await prisma.user.findMany({
      where: {
        deletedAt: null
      },

      orderBy: {
        createdAt: 'asc'
      }
    })

    return users
  }

  async fetchUsersByCreatedAtDesc(): Promise<User[]> {
    const users = await prisma.user.findMany({
      where: {
        deletedAt: null
      },

      orderBy: {
        createdAt: 'desc'
      }
    })

    return users
  }
  async fetchUsersByPeriod(startDate: Date, endDate: Date): Promise<User[]> {
    const start = new Date(startDate);
    start.setUTCHours(0, 0, 0, 0);

    const end = new Date(endDate);
    end.setUTCHours(23, 59, 59, 999);

    const users = await prisma.user.findMany({
      where: {
        deletedAt: null,
        createdAt: {
          gte: start,
          lte: end,
        },
      },
    });

    return users;
  }

  async fetchUsersByCreatedAt(date: Date): Promise<User[]> {

    const startDate = new Date(date);
    startDate.setUTCHours(0, 0, 0, 0);

    const endDate = new Date(date);
    endDate.setUTCHours(23, 59, 59, 999);

    const users = await prisma.user.findMany({
      where: {
        createdAt: {
          gte: startDate,
          lt: endDate,
        },
        deletedAt: null,
      },
    });

    return users
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        email,
      }
    })

    return user
  }

  async findByPhone(phone: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        phone,
      }
    })

    return user
  }

}