"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const hash_bycript_1 = require("../../utils/bycript/bycript/hash-bycript");
const jwt_token_1 = require("../../utils/jwt/jwt-token");
let AuthService = class AuthService {
    prismaService;
    hashService;
    constructor(prismaService, hashService) {
        this.prismaService = prismaService;
        this.hashService = hashService;
    }
    async Login(userDto) {
        try {
            const user = await this.prismaService.user.findUnique({
                where: { email: userDto.email },
            });
            const passwordValid = await this.hashService.comparePassword(userDto.password, user.password);
            if (!user || !passwordValid) {
                throw new common_1.HttpException('Invalid credentials', common_1.HttpStatus.UNAUTHORIZED);
            }
            const token = jwt_token_1.JwtUtil.createToken({ userName: user.name, userId: user.id }, "24h");
            const userData = {
                id: user.id,
                email: user.email,
                name: user.name,
                createdAt: user.createdAt,
            };
            return { user: userData, token: token };
        }
        catch (error) {
            console.error('Login error:', error);
            throw new common_1.HttpException('Login failed: ', common_1.HttpStatus.UNAUTHORIZED);
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService, hash_bycript_1.HashBycriptProtocol])
], AuthService);
//# sourceMappingURL=auth.service.js.map