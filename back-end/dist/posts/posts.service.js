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
exports.PostsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let PostsService = class PostsService {
    prismaService;
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    async findAll() {
        return this.prismaService.post.findMany();
    }
    async create(postData) {
        try {
            if (!postData.title || !postData.authorId || !postData.content) {
                throw new Error('Faltam campos obrigatórios');
            }
            const authorExists = await this.prismaService.user.findUnique({
                where: { id: postData.authorId },
            });
            if (!authorExists) {
                throw new common_1.HttpException('Algo saiu errado', common_1.HttpStatus.UNAUTHORIZED);
            }
            const newPost = await this.prismaService.post.create({
                data: {
                    title: postData.title,
                    content: postData.content,
                    authorId: postData.authorId,
                },
                include: {
                    author: {
                        select: {
                            id: true,
                            name: true,
                            email: true,
                        },
                    },
                }
            });
            return newPost;
        }
        catch (error) {
            console.log(error.message);
            throw new common_1.HttpException('Erro ao criar o post', common_1.HttpStatus.BAD_REQUEST);
        }
    }
};
exports.PostsService = PostsService;
exports.PostsService = PostsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PostsService);
//# sourceMappingURL=posts.service.js.map