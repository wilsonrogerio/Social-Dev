import { CanActivate, ExecutionContext } from '@nestjs/common';
export declare class JwtVerifyGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean;
}
