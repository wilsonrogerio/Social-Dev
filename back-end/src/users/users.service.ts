import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { BycriptService } from 'src/utils/bycript/bycript/bycript.service';
import { UserDto } from './dto/user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

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

    // Busca usuário pelo nome
    async findByName(name: string): Promise<UserDto[]> {
        try {
            // Converte o nome para minúsculas para busca case insensitive            
            let nameLower = name.toLowerCase();
            // Busca usuários no banco de dados pelo nome
            const users = await this.prismaService.user.findMany({
                where: { name: { contains: nameLower } }, // Busca por nome com case insensitive
                select: {
                    id: true, email: true, name: true, createdAt: true
                }
            });
            return users; // Retorna os usuários encontrados
        } catch (error) {
            throw new HttpException('Algo deu errado ao buscar usuários', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Atualizar usuário pelo ID
    async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<UserDto> {
        try {
            // Verifica se o usuário existe pelo ID
            const userExists = await this.prismaService.user.findUnique({
                where: { id },
            });

            if (!userExists) {
                throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND);
            }
            // Verifica se a senha e igual a senha passada no update
            const userPassword = await this.hashService.comparePassword(updateUserDto.actualPassword, userExists.password);
          
            if (!userPassword) {
                throw new HttpException('Senha incorreta', HttpStatus.UNAUTHORIZED);
            }
            // Verifica se a senha nova e diferente da senha atual
            if (updateUserDto.newPassword  === updateUserDto.actualPassword ) {
                throw new HttpException('A nova senha deve ser diferente da senha atual', HttpStatus.BAD_REQUEST);
            }
           
            // Se uma nova senha for fornecida, cria o hash da nova senha
            const newPassword = updateUserDto.newPassword ? await this.hashService.hashPassword(updateUserDto.newPassword) : updateUserDto.actualPassword;

            // Prepara os dados para atualização, incluindo a nova senha se fornecida
            const updatedData: Partial<CreateUserDto> = {
                name: updateUserDto.name,
                password: newPassword 
            };

            // Prepara os dados para atualização, incluindo a nova senha se fornecida
            const updatedUser = await this.prismaService.user.update({
                where: { id: id },
                data: updatedData,
                select: {
                    id: true, email: true, name: true, createdAt: true
                }
            });
            return updatedUser;

        } catch (error) {
            console.log(error);
            throw new HttpException('Algo deu errado ao atualizar o usuário', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Excluir usuário pelo ID
    async deleteUser(id: number): Promise<{ message: string }> {
        try {
            // Verifica se o usuário existe pelo ID
            const userExists = await this.prismaService.user.findUnique({
                where: { id },
            });

            if (!userExists) {
                throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND);
            }

            // Exclui o usuário do banco de dados
            await this.prismaService.user.delete({
                where: { id },
            });
            return { message: 'Usuário excluído com sucesso' }; // Retorna uma mensagem de sucesso
        } catch (error) {
            throw new HttpException('Algo deu errado ao excluir o usuário', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
