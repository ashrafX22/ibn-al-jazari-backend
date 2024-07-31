import { Injectable } from '@nestjs/common';
import { CreateShiekhDto } from './dto/create-shiekh.dto';
import { UpdateShiekhDto } from './dto/update-shiekh.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ShiekhService {
  constructor(private readonly prismaService: PrismaService) {}
  create(createShiekhDto: CreateShiekhDto) {
    const shiekh = this.prismaService.sheikh.create({
      data: {
        id: createShiekhDto.id,
        name: createShiekhDto.name,
        email: createShiekhDto.email,
        password: createShiekhDto.password,
        token: createShiekhDto.token,
      },
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
