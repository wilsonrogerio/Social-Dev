import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { BycriptService } from 'src/utils/bycript/bycript/bycript.service';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UsersService {
    constructor(private prismaService: PrismaService, private hashService: BycriptService) { }

    // Cria um novo usuário
    async createUser(createUserDto: CreateUserDto): Promise<UserDto> {
        try {
            // Verifica se o email já está cadastrado
            const emailExists = await this.prismaService.user.findUnique({
                where: { email: createUserDto.email },
            })
            if (emailExists) {
                // Se o email já existe, lança uma exceção
                throw new HttpException('Email já cadastrado', HttpStatus.BAD_REQUEST);
            }
            // Cria o hash da senha usando o serviço de hash
            const hashedPassword = await this.hashService.hashPassword(createUserDto.password);
            // Cria o usuário no banco de dados
            const user = await this.prismaService.user.create({
                data: {
                    ...createUserDto,
                    password: hashedPassword, // Usa a senha hasheada
                },
                select: {
                    id: true, email: true, name: true, createdAt: true
                }
            });
            return user; // Retorna o usuário criado

        } catch (error) {
            throw new HttpException('Algo deu errado ao criar o usuário', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Busca usuário por ID
    async findById(id: number): Promise<UserDto> {
        try {
            // Busca o usuário no banco de dados pelo ID
            const user = await this.prismaService.user.findUnique({
                where: { id },
                select: {
                    id: true, email: true, name: true, createdAt: true
                }
            });
            if (!user) {
                // Se o usuário não for encontrado, lança uma exceção
                throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND);
            }
            return user; // Retorna o usuário encontrado
        } catch (error) {
            throw new HttpException('Algo deu errado ao buscar o usuário', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
