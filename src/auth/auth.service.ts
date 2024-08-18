import { Injectable } from '@nestjs/common';
import { StudentService } from 'src/student/student.service';
import { TeacherService } from 'src/teacher/teacher.service';

@Injectable()
export class AuthService {
    constructor(private studentService: StudentService, private teacherService: TeacherService) { }

    async validateUser(email: string) {
        console.log("auth service")
        const student = await this.teacherService.findByEmail(email);
        const teacher = await this.studentService.findByEmail(email);

        if (!student && !teacher) return null;
        return student || teacher;
    }

    async get(id: number) {
        const student = await this.studentService.findOne(id);
        const teacher = await this.teacherService.findOne(id);

        if (!student && !teacher) return null;
        return student || teacher;
    }
}
