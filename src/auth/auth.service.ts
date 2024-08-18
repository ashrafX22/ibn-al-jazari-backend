import { Injectable } from '@nestjs/common';
import { CreateTeacherDto } from 'src/user/dto/create-teacher.dto';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
    constructor(private userService: UserService) { }

    async validateUser(createTeacherDto: CreateTeacherDto) {
        console.log("auth service")
        // todo: talseem
        return await this.userService.createTeacher(createTeacherDto);
    }

    // async validateUser(createUserDto: CreateUserDto) {
    //     console.log("auth service")
    //     // todo: talseem
    //     return await this.userService.createStudent(createUserDto);
    // }

    async get(id: number) {
        return await this.userService.findOne(id);
    }
}
