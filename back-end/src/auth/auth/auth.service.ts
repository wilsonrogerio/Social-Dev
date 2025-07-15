import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
    constructor( private prismaService: PrismaService) {}

    Login( email: string, password: string ) {
        try {
            const user = this.prismaService.user.findUnique({
                where: { email },
            });

            return user;
        } catch (error) {
            throw new HttpException('Login failed: ', HttpStatus.UNAUTHORIZED);
        }
    }
}