import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findByEmail(email);

    if (user && user.common.password === password) {
      const { common, ...specific } = user;
      const { password, ...general } = common;

      return {
        ...specific,
        common: general,
      };
    }

    return null;
  }

  async googleLogin(accessToken: string, refresh_token: string, email: string) {
    console.log('auth service');

    const user = await this.userService.findByEmail(email);
    if (user) {
      await this.userService.update(user.id, {
        accessToken,
        refreshToken: refresh_token || '',
      });
      return user;
    }

    return null;
  }

  async get(id: number) {
    return this.userService.findOne(id);
  }
}
