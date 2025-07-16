import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginUserDto } from './dto/login-user.dto';
import { UserDto } from 'src/users/dto/user.dto';
import { HashBycriptProtocol } from 'src/utils/bycript/bycript/hash-bycript';

@Injectable()
export class AuthService {
    constructor( private prismaService: PrismaService , private hashService : HashBycriptProtocol ) {}

    //Login do Usuario 
    async Login( userDto: LoginUserDto ){
        try {
            // Verifica se o usuario existe
            const user = await this.prismaService.user.findUnique({
                where: { email: userDto.email },
            });

            // Verifica se a senha informada é válida
            const passwordValid = await this.hashService.comparePassword(userDto.password, user!.password);

            // Se o usuário não existir ou a senha for inválida, lança uma exceção
            if (!user || !passwordValid) {
                throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
            }

            return { message : 'login realizado'};
        } catch (error) {
            console.error('Login error:', error);
            throw new HttpException('Login failed: ' , HttpStatus.UNAUTHORIZED);
        }
    }

}