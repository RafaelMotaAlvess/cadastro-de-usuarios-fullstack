// backend/src/models/User.ts

import { User as PrismaUser } from '@prisma/client';

export class User {
  id: string;
  name: string;
  email: string;
  phone: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;

  constructor(prismaUser: PrismaUser) {
    this.id = prismaUser.id;
    this.name = prismaUser.name;
    this.email = prismaUser.email;
    this.phone = prismaUser.phone;
    this.createdAt = prismaUser.createdAt;
    this.updatedAt = prismaUser.updatedAt;
    this.deletedAt = prismaUser.deletedAt;
  }
}
