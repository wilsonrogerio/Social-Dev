import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
    constructor(private usersService : UsersService) {}

    //Cria um novo usuário
    @Post('create')
    createUser(@Body() createUserDto: CreateUserDto) {
        console.log(createUserDto);
        return this.usersService.createUser(createUserDto);
    }
}
