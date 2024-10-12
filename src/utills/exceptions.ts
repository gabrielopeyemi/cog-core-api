import { HttpException, HttpStatus, Logger } from '@nestjs/common';

interface ExceptionResponseData {
  error: string;
  success?: boolean;
}

export const throwBadRequest = (error: string, addSuccessField = true) => {
  Logger.error('BAD_REQUEST: ', error);
  throw new HttpException(error, HttpStatus.BAD_REQUEST);
};

export const throwJWTError = (error: string, addSuccessField = true) => {
  Logger.error({ gabriel: error });
  throw new HttpException(error, HttpStatus.UNAUTHORIZED);
};

export const throwGatewayError = (error: string, addSuccessField = true) => {
  throw new HttpException(error, HttpStatus.BAD_GATEWAY);
};

export const throwNotFoundError = (error: string, addSuccessField = true) => {
  throw new HttpException(error, HttpStatus.NOT_FOUND);
};

export const unAuthorized = (error: string, addSuccessField = true) => {
  throw new HttpException(error, HttpStatus.UNAUTHORIZED);
};

export const NotPermitted = (addSuccessField = true) => {
  throw new HttpException(
    'User is not permitted to perform this operation',
    HttpStatus.NOT_ACCEPTABLE,
  );
};

export const throwException = (
  error: string,
  status: HttpStatus = HttpStatus.BAD_REQUEST,
  addSuccessField = true,
) => {
  Logger.error(error);
  const dataThrown: ExceptionResponseData = { error };
  if (addSuccessField) {
    dataThrown.success = false;
  }
  throw new HttpException(dataThrown, status);
};
