import { PostDto } from "src/posts/dto/post.dto";

export class UserDto{
    id: number;
    name: string;
    email: string;
    password?: string; // Optional, as it may not be returned in some contexts
    createdAt: Date;
    updatedAt?: Date;
    posts?: PostDto[]; // Optional, to include posts if needed
}