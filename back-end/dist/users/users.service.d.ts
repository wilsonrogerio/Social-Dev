import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { BycriptService } from 'src/utils/bycript/bycript/bycript.service';
import { UserDto } from './dto/user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersService {
    private prismaService;
    private hashService;
    constructor(prismaService: PrismaService, hashService: BycriptService);
    createUser(createUserDto: CreateUserDto): Promise<UserDto>;
    findById(id: number): Promise<UserDto>;
    findByName(name: string): Promise<UserDto[]>;
    updateUser(id: number, updateUserDto: UpdateUserDto): Promise<UserDto>;
    deleteUser(id: number): Promise<{
        message: string;
    }>;
}
