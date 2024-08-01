import { Injectable } from '@nestjs/common';
import { CreateShiekhDto } from 'src/shiekh/dto/create-shiekh.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService) { }

    async validateSheikh(createSheikhDto: CreateShiekhDto) {
        const { name, email } = createSheikhDto;

        console.log(name)
        console.log(email)

        return await this.prisma.sheikh.upsert({
            where: {
                email: email,
            },
            create: {
                email: email,
                name: name,
            },
            update: {
                name: name,
            },
        });
    }

    async getAll() {
        return await this.prisma.sheikh.findMany();
    }
}
