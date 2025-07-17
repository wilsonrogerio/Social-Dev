import { Transform } from "class-transformer";
import { IsEmail, IsString, MinLength } from "class-validator";

export class CreateUserDto{
    @IsString()
    @MinLength(3)
    @Transform(({ value }) => value?.toLowerCase())
    name: string;

    @IsEmail()
    @MinLength(6)
    email: string;

    @IsString()
    password: string; // Required for user creation
}