import { NextFunction, Request, Response } from 'express';
import { RequestWithEmail } from 'src/utills/types';
// import { RequestWithEmail } from 'src/utils/types';

export default function FilterRoles(roles: string[] | string) {
  return (req: RequestWithEmail, res: Response, next: NextFunction) => {
    if (!roles) return next();
    if (!Array.isArray(roles)) {
      roles = [JSON.stringify(roles)];
    }
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        message: 'FORBIDDEN',
        reason: 'user is not cleared for this action',
      });
    }
    return next();
  };
}
