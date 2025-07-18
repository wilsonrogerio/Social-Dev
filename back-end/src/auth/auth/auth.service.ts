import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginUserDto } from './dto/login-user.dto';
import { HashBycriptProtocol } from 'src/utils/bycript/bycript/hash-bycript';
import { JwtUtil } from 'src/utils/jwt/jwt-token';


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
            // Cria o token JWT
            const token = JwtUtil.createToken({userName : user.name, userId: user.id}, "24h")

            const userData = {
                id: user.id,
                email: user.email,
                name: user.name,
                createdAt: user.createdAt,
            };

            return { user : userData , token : token};
        } catch (error) {
            console.error('Login error:', error);
            throw new HttpException('Login failed: ' , HttpStatus.UNAUTHORIZED);
        }
    }

}