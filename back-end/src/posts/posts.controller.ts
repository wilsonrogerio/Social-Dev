import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostDto } from './dto/post.dto';
import { JwtVerifyGuard } from 'src/auth/guards/jwt-verify.guard';

@Controller('posts')
export class PostsController {
    constructor(private readonly postsService: PostsService) {}

    //Resgata todos os posts
    @UseGuards(JwtVerifyGuard)
    @Get()
    findAll() {       
        return this.postsService.findAll();
    }

    // Cria um novo post
    @UseGuards(JwtVerifyGuard)
    @Post('create')
    create(@Body() postData: PostDto , @Request() req) {
        const user = req.user['userId']; // Obtém o usuário do token JWT
        return this.postsService.create(postData , user);
    }

    // Atualiza um post

}
