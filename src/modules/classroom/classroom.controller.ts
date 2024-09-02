import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ClassroomService } from './classroom.service';
import { CreateClassroomDto } from './dto/create-classroom.dto';
import { UpdateClassroomDto } from './dto/update-classroom.dto';

@Controller('classroom')
export class ClassroomController {
  constructor(private readonly classroomService: ClassroomService) { }

  @Post()
  async create(@Body() createClassroomDto: CreateClassroomDto) {
    return this.classroomService.create(createClassroomDto);
  }

  @Get()
  async findAll() {
    return this.classroomService.findAll();
  }

  // @getClassroomsByTeacherSwaggerDoc()
  @Get('teacher/:teachderId')
  async getClassroomsByTeacherId(@Param('teachderId') teachderId: string) {
    return this.classroomService.findClassroomsByTeacherId(+teachderId);
  }

  // @getClassroomsByStudentIdSwaggerDoc()
  @Get('student/:studentId')
  async getClassroomsByStudentId(@Param('studentId') studentId: string) {
    return this.classroomService.findClassroomsByStudentId(+studentId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.classroomService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateClassroomDto: UpdateClassroomDto,
  ) {
    return this.classroomService.update(+id, updateClassroomDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.classroomService.remove(+id);
  }
}
