"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const bycript_service_1 = require("../utils/bycript/bycript/bycript.service");
let UsersService = class UsersService {
    prismaService;
    hashService;
    constructor(prismaService, hashService) {
        this.prismaService = prismaService;
        this.hashService = hashService;
    }
    async createUser(createUserDto) {
        try {
            const emailExists = await this.prismaService.user.findUnique({
                where: { email: createUserDto.email },
            });
            if (emailExists) {
                throw new common_1.HttpException('Email já cadastrado', common_1.HttpStatus.BAD_REQUEST);
            }
            const hashedPassword = await this.hashService.hashPassword(createUserDto.password);
            const user = await this.prismaService.user.create({
                data: {
                    ...createUserDto,
                    password: hashedPassword,
                },
                select: {
                    id: true, email: true, name: true, createdAt: true
                }
            });
            return user;
        }
        catch (error) {
            throw new common_1.HttpException('Algo deu errado ao criar o usuário', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async findById(id) {
        try {
            const user = await this.prismaService.user.findUnique({
                where: { id },
                select: {
                    id: true, email: true, name: true, createdAt: true
                }
            });
            if (!user) {
                throw new common_1.HttpException('Usuário não encontrado', common_1.HttpStatus.NOT_FOUND);
            }
            return user;
        }
        catch (error) {
            throw new common_1.HttpException('Algo deu errado ao buscar o usuário', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async findByName(name) {
        try {
            let nameLower = name.toLowerCase();
            const users = await this.prismaService.user.findMany({
                where: { name: { contains: nameLower } },
                select: {
                    id: true, email: true, name: true, createdAt: true
                }
            });
            return users;
        }
        catch (error) {
            throw new common_1.HttpException('Algo deu errado ao buscar usuários', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async updateUser(id, updateUserDto) {
        try {
            const userExists = await this.prismaService.user.findUnique({
                where: { id },
            });
            if (!userExists) {
                throw new common_1.HttpException('Usuário não encontrado', common_1.HttpStatus.NOT_FOUND);
            }
            const userPassword = await this.hashService.comparePassword(updateUserDto.actualPassword, userExists.password);
            if (!userPassword) {
                throw new common_1.HttpException('Senha incorreta', common_1.HttpStatus.UNAUTHORIZED);
            }
            if (updateUserDto.newPassword === updateUserDto.actualPassword) {
                throw new common_1.HttpException('A nova senha deve ser diferente da senha atual', common_1.HttpStatus.BAD_REQUEST);
            }
            const newPassword = updateUserDto.newPassword ? await this.hashService.hashPassword(updateUserDto.newPassword) : updateUserDto.actualPassword;
            const updatedData = {
                name: updateUserDto.name,
                password: newPassword
            };
            const updatedUser = await this.prismaService.user.update({
                where: { id: id },
                data: updatedData,
                select: {
                    id: true, email: true, name: true, createdAt: true
                }
            });
            return updatedUser;
        }
        catch (error) {
            console.log(error);
            throw new common_1.HttpException('Algo deu errado ao atualizar o usuário', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async deleteUser(id) {
        try {
            const userExists = await this.prismaService.user.findUnique({
                where: { id },
            });
            if (!userExists) {
                throw new common_1.HttpException('Usuário não encontrado', common_1.HttpStatus.NOT_FOUND);
            }
            await this.prismaService.user.delete({
                where: { id },
            });
            return { message: 'Usuário excluído com sucesso' };
        }
        catch (error) {
            throw new common_1.HttpException('Algo deu errado ao excluir o usuário', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService, bycript_service_1.BycriptService])
], UsersService);
//# sourceMappingURL=users.service.js.map