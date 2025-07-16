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
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService, bycript_service_1.BycriptService])
], UsersService);
//# sourceMappingURL=users.service.js.map