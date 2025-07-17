import { Injectable } from '@nestjs/common';
import { HashBycriptProtocol } from './hash-bycript';
import * as bcrypt from 'bcryptjs';


export class BycriptService extends HashBycriptProtocol{

    async hashPassword(password: string): Promise<string> {
        const salt = 10;

        const passwordHash = await bcrypt.hash(password, salt);

        return passwordHash; // Placeholder
    }

    async comparePassword(password: string, hash: string): Promise<boolean> {
        // Implement comparison logic here
        return bcrypt.compare(password , hash); // Placeholder
    }
}
