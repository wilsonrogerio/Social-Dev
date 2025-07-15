import { UserDto } from "src/users/dto/user.dto";

export class PostDto {
    id: number;
    title: string;
    content: string;
    authorId: number; // Assuming this is the ID of the user who created the post
    createdAt: Date;
    updatedAt: Date;
    author?: UserDto;
}