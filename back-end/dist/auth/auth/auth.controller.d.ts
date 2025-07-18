import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    Login(userDto: LoginUserDto): Promise<{
        user: {
            id: number;
            email: string;
            name: string;
            createdAt: Date;
        };
        token: string;
    }>;
}
