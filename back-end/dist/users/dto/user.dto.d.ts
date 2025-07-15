import { PostDto } from "src/posts/dto/post.dto";
export declare class UserDto {
    id: number;
    name: string;
    email: string;
    password?: string;
    createdAt: Date;
    updatedAt: Date;
    posts?: PostDto[];
}
