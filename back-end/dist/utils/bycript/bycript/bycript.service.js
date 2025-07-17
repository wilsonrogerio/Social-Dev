"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BycriptService = void 0;
const hash_bycript_1 = require("./hash-bycript");
const bcrypt = require("bcryptjs");
class BycriptService extends hash_bycript_1.HashBycriptProtocol {
    async hashPassword(password) {
        const salt = 10;
        const passwordHash = await bcrypt.hash(password, salt);
        return passwordHash;
    }
    async comparePassword(password, hash) {
        return bcrypt.compare(password, hash);
    }
}
exports.BycriptService = BycriptService;
//# sourceMappingURL=bycript.service.js.map