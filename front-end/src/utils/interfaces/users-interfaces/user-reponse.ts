export interface IUserResponse {
  id: number;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  profilePicture?: string; // Optional field for user profile picture
  bio?: string; // Optional field for user bio
}