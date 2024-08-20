import { Inject, Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { AuthService } from '../auth.service';
import { User } from 'src/models/baseUser';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authService: AuthService,
  ) {
    super();
  }

  serializeUser(user: User, done: Function) {
    console.log('Serialize User', user);
    done(null, user);
  }

  async deserializeUser(payload: any, done: Function) {
    console.log('payload', payload);
    const user = await this.authService.getUser(payload.id) || { placeholder: "placeholder" };
    console.log('Deserialize User');
    console.log(user);

    // stores the user inside req.user
    // can be accessed using @Req parameter
    return done(null, user);
  }
}
