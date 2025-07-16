import { HashBycriptProtocol } from './hash-bycript';
export declare class BycriptService extends HashBycriptProtocol {
    hashPassword(password: string): Promise<string>;
    comparePassword(password: string, hash: string): Promise<boolean>;
}
