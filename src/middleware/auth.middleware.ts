import { Injectable, Logger, NestMiddleware } from '@nestjs/common';

import { Request, Response } from 'express';
import { throwJWTError } from 'src/utills/exceptions';
import { verifyJWTToken } from 'src/utills/jwt';
import { RequestWithEmail } from 'src/utills/types';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: RequestWithEmail, res: Response, next: () => void) {
    const { authorization }: any = req?.headers;

    if (!authorization) {
      throwJWTError('UnAuthorized');
    }

    const [, token] = authorization.split(' ');
    const data = verifyJWTToken(token) as any;
    req.user = data.userDetails;
    next();
  }
}
