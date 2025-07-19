"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostWithAuthorDto = exports.PostDto = void 0;
class PostDto {
    id;
    title;
    content;
    authorId;
    createdAt;
    updatedAt;
    author;
}
exports.PostDto = PostDto;
class PostWithAuthorDto extends PostDto {
}
exports.PostWithAuthorDto = PostWithAuthorDto;
//# sourceMappingURL=post.dto.js.map