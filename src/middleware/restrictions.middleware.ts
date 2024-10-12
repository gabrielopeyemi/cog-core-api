import { Injectable, NestMiddleware } from '@nestjs/common';

import { Request, Response } from 'express';
import { throwBadRequest } from 'src/utills/exceptions';
import { RequestWithEmail } from 'src/utills/types';

@Injectable()
export class checkPaymentRestriction implements NestMiddleware {
  use(req: RequestWithEmail, res: Response, next: () => void) {
    const userRestrictions = req.user.paymentRestricted;
    if (userRestrictions) {
      throwBadRequest(
        "You're blocked from performing this operation, contact the admin for more details",
      );
    }
    next();
  }
}

@Injectable()
export class checkMatchRestriction implements NestMiddleware {
  use(req: RequestWithEmail, res: Response, next: () => void) {
    const userRestrictions = req?.user?.matchRestricted;
    console.log({ userRestrictions, user: req?.user })
    if (userRestrictions) {
      throwBadRequest(
        "You're blocked from performing this operation, contact the admin for more details",
      );
    }
    next();
  }
}

@Injectable()
export class checkTournamentRestriction implements NestMiddleware {
  use(req: RequestWithEmail, res: Response, next: () => void) {
    const userRestrictions = req?.user?.tournamentRestricted;

    if (userRestrictions) {
      throwBadRequest(
        "You're blocked from performing this operation, contact the admin for more details",
      );
    }
    next();
  }
}
