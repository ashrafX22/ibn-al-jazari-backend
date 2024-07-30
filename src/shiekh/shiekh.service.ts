import { Injectable } from '@nestjs/common';
import { CreateShiekhDto } from './dto/create-shiekh.dto';
import { UpdateShiekhDto } from './dto/update-shiekh.dto';

@Injectable()
export class ShiekhService {
  create(createShiekhDto: CreateShiekhDto) {
    return 'This action adds a new shiekh';
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
