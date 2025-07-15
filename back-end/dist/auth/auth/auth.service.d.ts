import { PrismaService } from 'src/prisma/prisma.service';
import { LoginUserDto } from './dto/login-user.dto';
import { UserDto } from 'src/users/dto/user.dto';
export declare class AuthService {
    private prismaService;
    constructor(prismaService: PrismaService);
    Login(userDto: LoginUserDto): Promise<UserDto | null>;
}
