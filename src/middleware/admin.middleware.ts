import { Injectable, Logger, NestMiddleware } from '@nestjs/common';

import { Request, Response } from 'express';
import { throwBadRequest } from 'src/utills/exceptions';
import { RequestWithEmail } from 'src/utills/types';

@Injectable()
export class AdminMiddleware implements NestMiddleware {
  use(req: RequestWithEmail, res: Response, next: () => void) {
    if (!req.user) throwBadRequest('user is not authenticated');
    if (!req.user.role.includes('admin')) throwBadRequest('user is not admin');
    next();
  }
}
