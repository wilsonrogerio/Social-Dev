import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { HashBycriptProtocol } from 'src/utils/bycript/bycript/hash-bycript';
import { BycriptService } from 'src/utils/bycript/bycript/bycript.service';

@Module({
  imports: [PrismaModule],
  providers: [AuthService,
    //classes abstartas devem ser injetadas com o protocolo
    {
      provide: HashBycriptProtocol,
      useClass: BycriptService, // Implementação concreta do protocolo
    }
  ],
  controllers: [AuthController]
})
export class AuthModule {}
