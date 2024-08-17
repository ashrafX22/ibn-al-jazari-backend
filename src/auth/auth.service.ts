import { Injectable } from '@nestjs/common';
import { TeacherService } from 'src/teacher/teacher.service';
import { CreateStudentDto } from 'src/student/dto/create-student.dto';
import { StudentService } from 'src/student/student.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private studentService: StudentService, private teacherService: TeacherService) { }

  // async localRegister(createStudentDto: CreateStudentDto) {
  //   return this.validateStudent(createStudentDto);
  // }

  async validateStudent(email: string, password: string) {
    const student = await this.studentService.findByEmail(email);
    if (student && student.password && await bcrypt.compare(password, student.password)) {
      return student;
    }
    return null;
  }

  async googleLogin(createStudentDto: CreateStudentDto) {
    console.log('auth service: google login');

    const { email } = createStudentDto;

    const student = await this.studentService.findByEmail(email);
    const teacher = await this.teacherService.findByEmail(email);

    if (!student && !teacher)
      return this.studentService.upsert(createStudentDto);

    console.log("student or teacher? ", student || teacher);
    return student || teacher;
  }

  async get(id: number) {
    return await this.studentService.findOne(id);
  }
}
