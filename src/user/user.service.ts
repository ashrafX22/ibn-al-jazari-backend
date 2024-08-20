import { Injectable } from '@nestjs/common';
import { StudentService } from 'src/student/student.service';
import { TeacherService } from 'src/teacher/teacher.service';
import { UpdateUserDto, User } from './user.type';

@Injectable()
export class UserService {
  constructor(
    private studentService: StudentService,
    private teacherService: TeacherService,
  ) {}

  services = [this.studentService, this.teacherService];

  async findAll(): Promise<User[]> {
    let result = [];
    for (const service of this.services) {
      result = [...result, await service.findAll()];
    }
    return result;
  }

  async findOne(id: number): Promise<User> {
    let result = null;
    for (const service of this.services)
      result = (await service.findById(id)) || result;

    return result;
  }

  async findByEmail(email: string): Promise<User> {
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
