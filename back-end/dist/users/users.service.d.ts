import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { BycriptService } from 'src/utils/bycript/bycript/bycript.service';
export declare class UsersService {
    private prismaService;
    private hashService;
    constructor(prismaService: PrismaService, hashService: BycriptService);
    createUser(createUserDto: CreateUserDto): Promise<{
        id: number;
        name: string;
        email: string;
        createdAt: Date;
    }>;
}
