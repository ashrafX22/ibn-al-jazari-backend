import { Injectable } from '@nestjs/common';
import { CreateShiekhDto } from './dto/create-shiekh.dto';
import { UpdateShiekhDto } from './dto/update-shiekh.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { sheikh } from '@prisma/client';

@Injectable()
export class ShiekhService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createShiekhDto: CreateShiekhDto) {
    const shiekh = await this.prisma.sheikh.create({
      data: createShiekhDto,
    });
    return shiekh;
  }

  async findAll() {
    const sheikhs = await this.prisma.sheikh.findMany();
    return sheikhs;
  }

  async findOne(id: number) {
    const sheikh = await this.prisma.sheikh.findUnique({ where: { id } });
    return sheikh;
  }

  async update(id: number, updateShiekhDto: UpdateShiekhDto) {
    const updateUser = await this.prisma.sheikh.update({
      where: { id },
      data: updateShiekhDto,
    });
    return updateUser;
  }

  async remove(id: number) {
    const deleteUser = await this.prisma.sheikh.delete({
      where: {
        id,
      },
    });
    return deleteUser;
  }
}
