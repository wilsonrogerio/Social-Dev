import { PostsService } from './posts.service';
import { PostDto } from './dto/post.dto';
export declare class PostsController {
    private readonly postsService;
    constructor(postsService: PostsService);
    findAll(): Promise<PostDto[]>;
    create(postData: PostDto, req: any): Promise<PostDto>;
    update(id: number, postData: PostDto, req: any): Promise<PostDto>;
    delete(req: any, id: number): Promise<{
        message: string;
    }>;
}
