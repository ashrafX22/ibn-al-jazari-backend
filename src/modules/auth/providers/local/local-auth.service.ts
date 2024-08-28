import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtUtilService } from 'src/modules/auth/jwt/jwt-util.service';
import { CreateStudentDto } from 'src/modules/student/dto/create-student.dto';
import { StudentService } from 'src/modules/student/student.service';
import { UserService } from 'src/modules/user/user.service';
import { TeacherEntity } from 'src/modules/teacher/entities/teacher.entity';
import { UnionUserEntity } from 'src/modules/user/types/user.type';
import { Jwt } from 'src/modules/auth/jwt/jwt.interface';


@Injectable()
export class LocalAuthService {
    constructor(
        private userService: UserService,
        private studentService: StudentService,
        private jwtUtilService: JwtUtilService
    ) { }

    async localValidateUser(email: string, password: string): Promise<UnionUserEntity | NotFoundException | UnauthorizedException> {
        const user = await this.userService.findByEmail(email);
        console.log("localValidateUser user:", user);

        if (!user) throw new NotFoundException('user not found');

        if (user.password === password)
            return user;
        else
            throw new UnauthorizedException('invalid credintials');
    }

    async localLogin(user: UnionUserEntity) {
        const payload: Jwt = { email: user.email, role: user.role };
        if (user instanceof TeacherEntity) payload.experience = user.experience;
        return {
            jwt: this.jwtUtilService.issueJwt(payload)
        };
    }

    async localRegister(createStudentDto: CreateStudentDto) {
        return await this.studentService.create(createStudentDto);
    }
}