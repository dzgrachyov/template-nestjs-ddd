import { CanActivate, ExecutionContext, Injectable, SetMetadata, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { HttpAuthService } from './http-auth.service';
import { Reflector } from '@nestjs/core';

export enum AuthRole {
  Admin = 'admin',
  Client = 'client',
}

export const IS_PUBLIC_KEY = 'IS_PUBLIC_KEY';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

export const AUTH_ROLES = 'AUTH_ROLES';
export const AuthRoles = (roles: AuthRole[]) => SetMetadata(AUTH_ROLES, roles);

@Injectable()
export class HttpAuthGuard implements CanActivate {
  constructor(
    private authService: HttpAuthService,
    private reflector: Reflector) { }

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const is_public = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (is_public) return true;

    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException('Invalid token');
    }
    try {
      const payload = await this.authService.verifyAsync(token);
      request['user'] = payload;
    } catch {
      throw new UnauthorizedException('Unable to verify token');
    }

    const auth_roles = this.reflector.getAllAndOverride<AuthRole[]>(AUTH_ROLES, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!auth_roles?.length) return true;

    const { user } = request;
    if (!user) throw new UnauthorizedException('User is not authenticated');
    if (!auth_roles.includes(user.role)) throw new UnauthorizedException('Invalid role');

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
