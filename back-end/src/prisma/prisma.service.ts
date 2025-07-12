import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '../../generated/prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
    //Inicializa o PrismaClient
    async onModuleInit() {
        await this.$connect();
    }
    //Desconecta o PrismaClient quando o módulo é destruído
    async onModuleDestroy() {
        await this.$disconnect();
    }
}