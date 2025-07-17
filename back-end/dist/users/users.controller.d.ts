import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersController {
    private usersService;
    constructor(usersService: UsersService);
    createUser(createUserDto: CreateUserDto): Promise<import("./dto/user.dto").UserDto>;
    updateUser(id: number, updateUserDto: UpdateUserDto): Promise<import("./dto/user.dto").UserDto>;
    findById(id: number): Promise<import("./dto/user.dto").UserDto>;
}
