import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    Login(userDto: LoginUserDto): Promise<import("../../users/dto/user.dto").UserDto | null>;
}
