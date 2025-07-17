import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PostDto } from './dto/post.dto';

@Injectable()
export class PostsService {
    constructor(private readonly prismaService: PrismaService) { }

    //Resgata todos os posts
    async findAll(): Promise<PostDto[]> {
        return this.prismaService.post.findMany();
    }

    // Cria um novo post
    async create(postData: PostDto , userId : number): Promise<PostDto> {
        try {
            //Verifica se o postData contém os campos necessários
            if (!postData.title || !postData.content) {
                throw new Error('Faltam campos obrigatórios');
            }

            // Verifica se o id do autor é válido
            const authorExists = await this.prismaService.user.findUnique({
                where: { id: userId },
            });
            if (!authorExists) {
                throw new HttpException('Algo saiu errado', HttpStatus.UNAUTHORIZED);
            }

            const newPost = await this.prismaService.post.create({
                data: {
                    title: postData.title,
                    content: postData.content,
                    authorId: userId, // Referência ao usuário
                },
                include: {
                    author: {
                        select: {
                            id: true,
                            name: true,
                            email: true,
                        }, // Retorna os dados do usuário autor
                    },
                }});

            return newPost;
        } catch (error) {
            console.log(error.message);
            throw new HttpException('Erro ao criar o post', HttpStatus.BAD_REQUEST);
        }
    }

    // Atualiza um post
    async update(id: number, postData: PostDto, userId: number): Promise<PostDto> {
        const post = await this.prismaService.post.findUnique({
            where: { id },
        });

        // Verifica se o post existe
        if (!post) {
            throw new HttpException('Post não encontrado', HttpStatus.NOT_FOUND);
        }

        // Verifica se o usuário é o autor do post
        if (post.authorId !== userId) {
            throw new HttpException('Você não tem permissão para atualizar este post', HttpStatus.FORBIDDEN);
        }

        // Atualiza o post
        const postUpdated = await this.prismaService.post.update({
            where: { id },
            data: postData,
        });
        return postUpdated;
    }
    // Deletar um post
    async delete(id: number , userId : number): Promise<{ message: string }> {
        const post = await this.prismaService.post.findUnique({
            where: { id },
        });
        // Verifica se o post existe
        if (!post) {
            throw new HttpException('Post não encontrado', HttpStatus.NOT_FOUND);
        }

        // Verifica se o usuário é o autor do post
        if (post.authorId !== userId) {
            throw new HttpException('Você não tem permissão para deletar este post', HttpStatus.FORBIDDEN);
        }

        // Deleta o post
        await this.prismaService.post.delete({
            where: { id },
        });

        return { message: 'Post deletado com sucesso' };
    }
}
