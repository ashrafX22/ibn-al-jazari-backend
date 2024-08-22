import { Injectable } from '@nestjs/common';
import { StudentService } from 'src/modules/student/student.service';
import { TeacherService } from 'src/modules/teacher/teacher.service';
import { UpdateUserDto, User } from './user.type';
import { TeacherEntity } from 'src/modules/teacher/entities/teacher.entity';
import { StudentEntity } from 'src/modules/student/entities/student.entity';

@Injectable()
export class UserService {
  constructor(
    private studentService: StudentService,
    private teacherService: TeacherService,
  ) { }

  services = [this.studentService, this.teacherService];

  async findAll(): Promise<(TeacherEntity | StudentEntity)[]> {
    let result = [];
    for (const service of this.services) {
      result = [...result, await service.findAll()];
    }
    return result;
  }

  async findById(id: number): Promise<TeacherEntity | StudentEntity> {
    let result = null;
    for (const service of this.services)
      result = (await service.findById(id)) || result;

    return result;
  }

  async findByEmail(email: string): Promise<TeacherEntity | StudentEntity> {
    console.log('user findByEmail');
    let result = null;
    for (const service of this.services)
      result = (await service.findByEmail(email)) || result;

    return result;
  }

  async update(
    id: number,
    updateUserDto: Partial<UpdateUserDto>,
  ): Promise<UpdateUserDto> {
    let result = null;
    for (const service of this.services)
      result = (await service.update(id, updateUserDto)) || result;

    return result;
  }
}
