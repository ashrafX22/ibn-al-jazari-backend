import { Injectable } from "@nestjs/common";
import { CreateStudentDto } from "src/modules/student/dto/create-student.dto";
import { Jwt } from "../../jwt/jwt.interface";
import { TeacherEntity } from "src/modules/teacher/entities/teacher.entity";
import { UserService } from "src/modules/user/user.service";
import { JwtUtilService } from "src/modules/auth/jwt/jwt-util.service";
import { StudentService } from "src/modules/student/student.service";
import { TeacherService } from "src/modules/teacher/teacher.service";
import { CreateTeacherDto } from "src/modules/teacher/dto/create-teacher.dto";

@Injectable()
export class GoogleAuthService {
    constructor(
        private userService: UserService,
        private studentService: StudentService,
        private teacherService: TeacherService,
        private jwtUtilService: JwtUtilService
    ) { }

    async googleAuth(googleInfo: any) {
        const { email, googleAccessToken, googleRefreshToken } = googleInfo;
        const user = await this.userService.findByEmail(email);
        if (user) {
            console.log(
                'same google refresh token?',
                user.googleRefreshToken === googleRefreshToken,
            );
            const result = await this.userService.update(user.id, {
                googleRefreshToken: googleRefreshToken,
            });
            console.log(
                'same google refresh token after user update?',
                user.googleRefreshToken === result.googleRefreshToken,
            );

            let payload: Jwt = {
                id: user.id,
                role: user.role,
                googleAccessToken: googleAccessToken,
            };

            if (user instanceof TeacherEntity)
                payload = { ...payload, experience: user.experience };

            return {
                newAccount: false,
                jwt: this.jwtUtilService.issueJwt(payload),
            };
        } else return { newAccount: true };
    }

    async googleRegisterStudent(createStudentDto: CreateStudentDto) {
        const student = await this.studentService.create(createStudentDto);

        const payload: Jwt = {
            id: student.id,
            role: student.role,
            googleAccessToken: createStudentDto.googleAccessToken,
        };

        return this.jwtUtilService.issueJwt(payload);
    }

    async googleRegisterTeacher(createTeacherDto: CreateTeacherDto) {
        const teacher = await this.teacherService.create(createTeacherDto);

        const payload: Jwt = {
            id: teacher.id,
            role: teacher.role,
            experience: teacher.experience,
            googleAccessToken: createTeacherDto.googleAccessToken
        };

        return this.jwtUtilService.issueJwt(payload);
    }
}
