import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService) { }

    async validateUser(createUserDto: CreateUserDto) {
        const { name, email, role } = createUserDto;

        console.log(name)
        console.log(email)
        console.log(role)

        return await this.prisma.user.upsert({
            where: {
                email: email,
            },
            create: {
                email: email,
                name: name,
                role: role
            },
            update: {
                name: name,
            },
        });
    }

    // TODO: this should not be here, it should be inside user service
    async get(id: number) {
        return await this.prisma.user.findUnique({
            where: {
                id: id
            }
        });
    }

    // TODO: this should not be here, it should be inside user service
    async getAll() {
        return await this.prisma.user.findMany();
    }
}
