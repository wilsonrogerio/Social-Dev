import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';


@Controller('users')
export class UsersController {
    constructor(private usersService : UsersService) {}

    //Cria um novo usuário
    @Post('create')
    createUser(@Body() createUserDto: CreateUserDto) {
        return this.usersService.createUser(createUserDto);
    }

    // Rota publica de buscar usuario pelo nome
    @Get('findbyname/:name')
    findByName(@Param('name') name: string) {
        return this.usersService.findByName(name);
    }

    //Atualizar usuário
    @Patch('update/:id')
    updateUser(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto) {
        return this.usersService.updateUser(id, updateUserDto);
    }

    // Busca usuario por ID
    @Get('find/:id')
    findById(@Param('id', ParseIntPipe) id: number) {
        return this.usersService.findById(id);
    }

    // Deletar usuário
    @Delete('delete/:id')
    deleteUser(@Param('id', ParseIntPipe) id: number) {
        return this.usersService.deleteUser(id);
    }

}
