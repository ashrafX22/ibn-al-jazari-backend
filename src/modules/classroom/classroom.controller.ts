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
  constructor(private readonly classroomService: ClassroomService) {}

  @Post()
  create(@Body() createClassroomDto: CreateClassroomDto) {
    return this.classroomService.create(createClassroomDto);
  }

  @Get()
  findAll() {
    return this.classroomService.findAll();
  }

  // @getClassroomsByTeacherSwaggerDoc()
  @Get('teacher/:teachderId')
  getClassroomsByTeacherId(@Param('teachderId') teachderId: string) {
    return this.classroomService.getClassroomsByTeacherId(+teachderId);
  }

  // @getClassroomsByStudentIdSwaggerDoc()
  @Get('student/:studentId')
  getClassroomsByStudentId(@Param('studentId') studentId: string) {
    return this.classroomService.getClassroomsByStudentId(+studentId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.classroomService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateClassroomDto: UpdateClassroomDto,
  ) {
    return this.classroomService.update(+id, updateClassroomDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.classroomService.remove(+id);
  }
}
