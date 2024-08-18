import { Injectable } from '@nestjs/common';
import { StudentService } from 'src/student/student.service';
import { TeacherService } from 'src/teacher/teacher.service';
import { IUser } from 'src/user/user.service';

@Injectable()
export class AuthService {
    constructor(private studentService: StudentService, private teacherService: TeacherService) { }

    async validateUser(access_token: string, refresh_token: string, email: string) {
        console.log("auth service")
        const services: IUser[] = [this.studentService, this.teacherService];

        for (const service of services) {
            const user = await service.findByEmail(email);
            if (user) {
                await service.update(
                    user.id,
                    {
                        access_token,
                        refresh_token: refresh_token || ''
                    }
                );
                return user;
            }
        }

        return null;
    }

    async get(id: number) {
        const student = await this.studentService.findOne(id);
        const teacher = await this.teacherService.findOne(id);

        if (!student && !teacher) return null;
        return student || teacher;
    }
}
