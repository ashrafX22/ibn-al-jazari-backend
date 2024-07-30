import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ShiekhService } from './shiekh.service';
import { CreateShiekhDto } from './dto/create-shiekh.dto';
import { UpdateShiekhDto } from './dto/update-shiekh.dto';

@Controller('shiekh')
export class ShiekhController {
  constructor(private readonly shiekhService: ShiekhService) {}

  @Post()
  create(@Body() createShiekhDto: CreateShiekhDto) {
    return this.shiekhService.create(createShiekhDto);
  }

  @Get()
  findAll() {
    return this.shiekhService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.shiekhService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateShiekhDto: UpdateShiekhDto) {
    return this.shiekhService.update(+id, updateShiekhDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.shiekhService.remove(+id);
  }
}
