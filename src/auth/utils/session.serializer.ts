import { Inject, Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { AuthService } from '../auth.service';
import { Student } from '@prisma/client';

@Injectable()
export class SessionSerializer extends PassportSerializer {
    constructor(
        @Inject('AUTH_SERVICE') private readonly authService: AuthService,
    ) {
        super();
    }

    serializeUser(student: Student, done: Function) {
        console.log('Serializer Student');
        done(null, student);
    }

    async deserializeUser(payload: any, done: Function) {
        const student = await this.authService.get(payload.id);
        console.log('Deserialize Student');
        console.log(student);
        return student ? done(null, student) : done(null, null);
    }
}