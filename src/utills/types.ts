import { User } from 'src/schema/users.schema';
import { Request } from 'express';

export interface AuthLoginResponse {
  match: boolean;
  details: User;
}

export interface RequestWithEmail extends Request {
  user: any;
}