import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
    constructor(private prismaService : PrismaService) {}

    async createUser(createUserDto: CreateUserDto) {
        try {
            const emailExists = await this.prismaService.user.findUnique({
                where: { email: createUserDto.email },})
            if (emailExists) {
                throw new HttpException('Email já cadastrado', HttpStatus.BAD_REQUEST);
            }
            
           
        } catch (error) {
            throw new HttpException('Algo deu errado ao criar o usuário', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }   
}
