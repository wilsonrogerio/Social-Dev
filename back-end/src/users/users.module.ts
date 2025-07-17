import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { HashBycriptProtocol } from 'src/utils/bycript/bycript/hash-bycript';
import { BycriptService } from 'src/utils/bycript/bycript/bycript.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
    controllers: [UsersController],
    providers: [UsersService,
        BycriptService,
        {
            provide: HashBycriptProtocol,
            useClass: BycriptService, // Implementação concreta do protocolo
        }
    ],
    imports: [PrismaModule],
})
export class UsersModule { }
