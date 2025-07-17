"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtUtil = void 0;
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;
class JwtUtil {
    static createToken(payload, expiresIn = '24h') {
        return jwt.sign(payload, JWT_SECRET, { expiresIn });
    }
    static verifyToken(token, secret) {
        return jwt.verify(token, secret);
    }
}
exports.JwtUtil = JwtUtil;
//# sourceMappingURL=jwt-create-token.js.map