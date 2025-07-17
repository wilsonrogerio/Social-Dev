import { IsString, MinLength } from "class-validator";

export class UpdateUserDto {
    @IsString()
    @MinLength(3)
    name?: string;

    @IsString()
    actualPassword: string; // Senha atual sera obrigatória para atualizar o usuário

    @IsString()
    @MinLength(6)
    newPassword?: string;
}