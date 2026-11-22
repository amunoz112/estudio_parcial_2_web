import { createParamDecorator } from '@nestjs/common';
import type { ExecutionContext } from '@nestjs/common';
import type { Request } from 'express';
import type { Role } from '../../users/entities/role.enum.js';

export interface JwtPayload {
  sub: number;
  role: Role;
}

export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext): JwtPayload | undefined => {
    const request = context
      .switchToHttp()
      .getRequest<Request & { user?: JwtPayload }>();

    return request.user;
  },
);