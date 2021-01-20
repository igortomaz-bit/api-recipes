import { Request, Response, NextFunction} from 'express';

interface Exception {
  code: string;
  message: string;
  httpStatusCode?: number;
}

class ExceptionMiddleware {
  public catch(error: any, request: Request, response: Response, next: NextFunction) {
    const httpStatusCode = ExceptionMiddleware.getStatusCodeFromError(error);
    const exception = ExceptionMiddleware.buildExceptionObject(httpStatusCode, error);
    response.status(httpStatusCode).send(exception);
  }


  static buildExceptionObject(httpStatusCode: number, error: any): Exception {
    return {
      code: ExceptionMiddleware.getExceptionCode(httpStatusCode),
      message: ExceptionMiddleware.getUsedMessage(error, httpStatusCode)
    }
  }
  
  static getUsedMessage(error: any, httpStatusCode: number) {
    if (error.apiName) {
      return `The api ${error.apiName} is unavailable.`;
    }

    if (error.message)
      return error.message;

    return ExceptionMiddleware.getExceptionMessage(httpStatusCode);
  }

  static getExceptionMessage(httpStatusCode: number = 500) {
    const exceptionMessageObject = {
      400: 'Client specified an invalid argument, request body or query param.',
      401: 'Request not authenticated due to missing, invalid, or expired credentials.',
      403: 'Client does not have sufficient permissions to perform this action.',
      404: 'The specified resource is not found.',
      500: 'The server encountered an unexpected error.',
      504: 'Request timeout exceeded.'
    };

    return exceptionMessageObject[httpStatusCode];
  }

  static getExceptionCode(httpStatusCode: number = 500) {
    const exceptionCodeObject = {
      400: 'INVALID_ARGUMENT',
      401: 'BAD_REQUEST',
      403: 'PERMISSION_DENIED',
      404: 'NOT_FOUND',
      500: 'INTERNAL_ERROR',
      504: 'TIMEOUT'
    };

    return exceptionCodeObject[httpStatusCode];
  }

  static getStatusCodeFromError(error: any): number {
    if (error.httpStatusCode)
      return error.httpStatusCode;

    return 500;
  } 
}

export default new ExceptionMiddleware();