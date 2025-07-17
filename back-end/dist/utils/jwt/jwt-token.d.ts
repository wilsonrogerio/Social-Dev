export declare class JwtUtil {
    static createToken(payload: object, expiresIn?: string | number): string;
    static verifyToken(token: string): any;
}
