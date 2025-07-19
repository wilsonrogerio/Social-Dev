import { IUserResponse } from "../users-interfaces/user-reponse";

export interface IPostResponse {
  id: number,
  title: string,
  content: string,
  authorId: number,
  createdAt: string,
  updatedAt: string,
  author: IUserResponse
}