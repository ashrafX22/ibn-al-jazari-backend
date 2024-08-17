import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) { }

  async validateUser(createUserDto: CreateUserDto) {
    console.log('auth service');
    return await this.userService.create(createUserDto);
  }

  async get(id: number) {
    return await this.userService.findOne(id);
  }
}
