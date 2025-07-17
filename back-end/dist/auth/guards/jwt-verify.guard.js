"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtVerifyGuard = void 0;
const common_1 = require("@nestjs/common");
const jwt_token_1 = require("../../utils/jwt/jwt-token");
let JwtVerifyGuard = class JwtVerifyGuard {
    canActivate(context) {
        const req = context.switchToHttp().getRequest();
        const authHeader = req.headers['authorization'];
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw new common_1.UnauthorizedException('Token não fornecido');
        }
        const token = authHeader.split(' ')[1];
        try {
            const payload = jwt_token_1.JwtUtil.verifyToken(token);
            req['user'] = payload;
            return true;
        }
        catch {
            throw new common_1.UnauthorizedException('Token inválido');
        }
    }
};
exports.JwtVerifyGuard = JwtVerifyGuard;
exports.JwtVerifyGuard = JwtVerifyGuard = __decorate([
    (0, common_1.Injectable)()
], JwtVerifyGuard);
//# sourceMappingURL=jwt-verify.guard.js.map