import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateUserDto) {
    const userExists = await this.prisma.user.findUnique({
      where: { email: data.email },
    });
    if (userExists)
      throw new HttpException('email allrady exists', HttpStatus.CONFLICT);
    const User = await this.prisma.user.create({
      data,
    });
    return User;
  }

  async upsert(createUserDto: CreateUserDto) {
    const { name, email, password, gender, access_token, refresh_token, age } =
      createUserDto;
    console.log('user service');
    return this.prisma.user.upsert({
      where: {
        email: email,
      },
      create: {
        name: name,
        email: email,
        password: password,
        gender: gender,
        age: age,
        access_token: access_token,
        refresh_token: refresh_token,
      },
      update: {
        name: name,
      },
    });
  }

  async findAll(): Promise<UserEntity[]> {
    const users = await this.prisma.user.findMany();
    return users.map((user) => new UserEntity(user));
  }

  async findOne(id: string): Promise<UserEntity> {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user)
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    return user;
  }

  async update(id: string, data: UpdateUserDto) {
    const updateUser = await this.prisma.user.update({
      where: { id },
      data,
    });
    return updateUser;
  }

  async remove(id: string) {
    await this.findOne(id);
    const deleteUser = await this.prisma.user.delete({
      where: {
        id,
      },
    });
    return deleteUser;
  }
}
