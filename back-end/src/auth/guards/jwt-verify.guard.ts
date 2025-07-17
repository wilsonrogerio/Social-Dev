import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { JwtUtil } from 'src/utils/jwt/jwt-token';

// JWT Verify Guard - criado com Ia para verificar o token JWT
// Este guard verifica se o token JWT é válido e está presente no cabeçalho da requ
@Injectable()
export class JwtVerifyGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest<Request>();
    const authHeader = req.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Token não fornecido');
    }
    const token = authHeader.split(' ')[1];
    try {
      const payload = JwtUtil.verifyToken(token);
      req['user'] = payload // Adiciona o payload do usuário à requisição
      return true;
    } catch {
      throw new UnauthorizedException('Token inválido');
    }
  }
}