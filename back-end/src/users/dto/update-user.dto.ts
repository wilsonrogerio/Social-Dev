export class UpdateUserDto {
    name?: string;
    actualPassword: string; // Senha atual sera obrigatória para atualizar o usuário
    newPassword?: string;
}