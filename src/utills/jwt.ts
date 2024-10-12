import * as jwt from 'jsonwebtoken';
import { Logger } from '@nestjs/common';
import { throwBadRequest, throwJWTError } from './exceptions';

const jwtSecret = 'dncioqeldjknqio1lkhn1w';
export const generateJWTToken = (details: any, expiresIn?: string): string => {
  try {
    return jwt.sign({ userDetails: details }, jwtSecret, {
      expiresIn: '24h',
    });
  } catch (error) {
    throwBadRequest('generateJWTToken:' + error);
  }
};

export const verifyJWTToken = (token: string): string | Record<any, any> => {
  try {
    const response = jwt.verify(token, jwtSecret);
    return response;
  } catch (error) {
    Logger.debug('verifyJWTToken:' + error);
    throwJWTError('Authorization error');
  }
};
