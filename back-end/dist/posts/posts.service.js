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
        try {
            const postsList = await this.prismaService.post.findMany({
                include: {
                    author: {
                        select: {
                            id: true,
                            name: true,
                            email: true,
                            createdAt: true,
                            updatedAt: true,
                        }
                    }
                }
            });
            if (!postsList || postsList.length === 0) {
                throw new common_1.HttpException('Nenhum post encontrado', common_1.HttpStatus.NOT_FOUND);
            }
            return postsList;
        }
        catch (error) {
            throw new common_1.HttpException('Erro ao buscar posts', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async create(postData, userId) {
        try {
            if (!postData.title || !postData.content) {
                throw new Error('Faltam campos obrigatórios');
            }
            const authorExists = await this.prismaService.user.findUnique({
                where: { id: userId },
            });
            if (!authorExists) {
                throw new common_1.HttpException('Algo saiu errado', common_1.HttpStatus.UNAUTHORIZED);
            }
            const newPost = await this.prismaService.post.create({
                data: {
                    title: postData.title,
                    content: postData.content,
                    authorId: userId,
                },
                include: {
                    author: {
                        select: {
                            id: true,
                            name: true,
                            email: true,
                            createdAt: true,
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
    async update(id, postData, userId) {
        const post = await this.prismaService.post.findUnique({
            where: { id },
        });
        if (!post) {
            throw new common_1.HttpException('Post não encontrado', common_1.HttpStatus.NOT_FOUND);
        }
        if (post.authorId !== userId) {
            throw new common_1.HttpException('Você não tem permissão para atualizar este post', common_1.HttpStatus.FORBIDDEN);
        }
        const postUpdated = await this.prismaService.post.update({
            where: { id },
            data: {
                title: postData.title,
                content: postData.content,
            },
            include: {
                author: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        createdAt: true,
                        updatedAt: true,
                    }
                }
            }
        });
        return postUpdated;
    }
    async delete(id, userId) {
        const post = await this.prismaService.post.findUnique({
            where: { id },
        });
        if (!post) {
            throw new common_1.HttpException('Post não encontrado', common_1.HttpStatus.NOT_FOUND);
        }
        if (post.authorId !== userId) {
            throw new common_1.HttpException('Você não tem permissão para deletar este post', common_1.HttpStatus.FORBIDDEN);
        }
        await this.prismaService.post.delete({
            where: { id },
        });
        return { message: 'Post deletado com sucesso' };
    }
};
exports.PostsService = PostsService;
exports.PostsService = PostsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PostsService);
//# sourceMappingURL=posts.service.js.map