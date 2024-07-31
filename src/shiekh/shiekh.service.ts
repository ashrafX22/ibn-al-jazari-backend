import { Injectable } from '@nestjs/common';
import { CreateShiekhDto } from './dto/create-shiekh.dto';
import { UpdateShiekhDto } from './dto/update-shiekh.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ShiekhService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(createShiekhDto: CreateShiekhDto) {
    const shiekh = await this.prismaService.sheikh.create({
      data: createShiekhDto,
    });
    return shiekh;
  }

  findAll() {
    return `This action returns all shiekh`;
  }

  findOne(id: number) {
    return `This action returns a #${id} shiekh`;
  }

  update(id: number, updateShiekhDto: UpdateShiekhDto) {
    return `This action updates a #${id} shiekh`;
  }

  remove(id: number) {
    return `This action removes a #${id} shiekh`;
  }
}
