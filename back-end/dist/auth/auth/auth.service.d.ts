import { PrismaService } from 'src/prisma/prisma.service';
import { LoginUserDto } from './dto/login-user.dto';
import { HashBycriptProtocol } from 'src/utils/bycript/bycript/hash-bycript';
export declare class AuthService {
    private prismaService;
    private hashService;
    constructor(prismaService: PrismaService, hashService: HashBycriptProtocol);
    Login(userDto: LoginUserDto): Promise<{
        message: string;
    }>;
}
