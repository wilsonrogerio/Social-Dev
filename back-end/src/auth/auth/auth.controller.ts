import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    Login(@Body() userDto: LoginUserDto) {
        console.log('Login attempt with user:', userDto);
        return this.authService.Login(userDto);
    }
    
        
}
