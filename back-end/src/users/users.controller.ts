import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';


@Controller('users')
export class UsersController {
    constructor(private usersService : UsersService) {}

    //Cria um novo usuário
    @Post('create')
    createUser(@Body() createUserDto: CreateUserDto) {
        return this.usersService.createUser(createUserDto);
    }

    // Busca usuario por ID
    @Get('find/:id')
    findById(@Param('id', ParseIntPipe) id: number) {
        return this.usersService.findById(id);
    }
}
