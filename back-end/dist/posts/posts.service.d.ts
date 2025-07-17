import { PrismaService } from 'src/prisma/prisma.service';
import { PostDto } from './dto/post.dto';
export declare class PostsService {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    findAll(): Promise<PostDto[]>;
    create(postData: PostDto, userId: number): Promise<PostDto>;
}
