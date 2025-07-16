import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginUserDto } from './dto/login-user.dto';
import { UserDto } from 'src/users/dto/user.dto';

@Injectable()
export class AuthService {
    constructor( private prismaService: PrismaService) {}

    //Login do Usuario 
    async Login( userDto: LoginUserDto ): Promise<UserDto | null> {
        try {
            const user = await this.prismaService.user.findUnique({
                where: { email: userDto.email },
            });

            return user;
        } catch (error) {
            throw new HttpException('Login failed: ', HttpStatus.UNAUTHORIZED);
        }
    }

}