import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}
  async create(data: CreateUserDto) {
    const User = await this.prisma.user.create({
      data,
    });
    return User;
  }

  async findAll() {
    const users = await this.prisma.user.findMany();
    return users;
  }

  async findOne(id: number) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    return user;
  }

  async update(id: number, data: UpdateUserDto) {
    const updateUser = await this.prisma.user.update({
      where: { id },
      data,
    });
    return updateUser;
  }

  async remove(id: number) {
    const deleteUser = await this.prisma.user.delete({
      where: {
        id,
      },
    });
    return deleteUser;
  }
}
