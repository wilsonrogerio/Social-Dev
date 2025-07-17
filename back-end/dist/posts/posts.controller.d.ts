import { PostsService } from './posts.service';
import { PostDto } from './dto/post.dto';
export declare class PostsController {
    private readonly postsService;
    constructor(postsService: PostsService);
    findAll(): Promise<PostDto[]>;
    create(postData: PostDto): Promise<PostDto>;
}
