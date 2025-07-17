import { Body, Controller, Get, Post } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostDto } from './dto/post.dto';

@Controller('posts')
export class PostsController {
    constructor(private readonly postsService: PostsService) {}

    //Resgata todos os posts
    @Get()
    findAll() {
        return this.postsService.findAll();
    }

    // Cria um novo post
    @Post('create')
    create(@Body() postData: PostDto) {
        return this.postsService.create(postData);
    }

    // Atualiza um post

}
