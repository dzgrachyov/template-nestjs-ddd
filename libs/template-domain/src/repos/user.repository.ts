import { Injectable } from '@nestjs/common';
import { PrismaRepository } from './prisma.repository';
import { User, Prisma } from '@prisma/client';

@Injectable()
export class UserRepository {
  constructor(private prisma: PrismaRepository) { }

  async user(user: Pick<User, 'id'>): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: {
        id: user.id,
      },
    });
  }

  async userByEmail(user: Pick<User, 'email'>): Promise<User | null> {
    return this.prisma.user.findFirst({
      where: {
        email: user.email,
      },
    });
  }

  async users(user: Pick<User, 'id'>): Promise<User[]> {
    return this.prisma.user.findMany({
      where: {
        id: user.id,
      },
    });
  }

  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.user.create({
      data,
    });
  }

  async updateUser(user: Pick<User, 'id'>, data: Prisma.UserUpdateInput): Promise<User> {
    return this.prisma.user.update({
      where: {
        id: user.id,
      },
      data,
    });
  }

  async deleteUser(user: Pick<User, 'id'>): Promise<User> {
    return this.prisma.user.delete({
      where: {
        id: user.id,
      },
    });
  }
}