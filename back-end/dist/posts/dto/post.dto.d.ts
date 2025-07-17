import { UserDto } from "src/users/dto/user.dto";
export declare class PostDto {
    id: number;
    title: string;
    content: string | null;
    authorId: number;
    createdAt: Date;
    updatedAt: Date;
    authorName?: UserDto['name'];
}
