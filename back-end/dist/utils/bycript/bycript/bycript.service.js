"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BycriptService = void 0;
const common_1 = require("@nestjs/common");
const hash_bycript_1 = require("./hash-bycript");
const bcrypt = require("bcryptjs");
let BycriptService = class BycriptService extends hash_bycript_1.HashBycriptProtocol {
    async hashPassword(password) {
        const salt = 10;
        const passwordHash = await bcrypt.hash(password, salt);
        return passwordHash;
    }
    async comparePassword(password, hash) {
        return bcrypt.compare(password, hash);
    }
};
exports.BycriptService = BycriptService;
exports.BycriptService = BycriptService = __decorate([
    (0, common_1.Injectable)()
], BycriptService);
//# sourceMappingURL=bycript.service.js.map