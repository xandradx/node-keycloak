import { Request, Response } from 'express';
import * as HttpStatus from 'http-status-codes';
import * as logger from 'winston';

/**
 * Error response
 */
export const JSONERROR: any = (req: Request, res: Response) : void => {
    const errorCode: number = res.locals.errorCode || HttpStatus.BAD_REQUEST;
    const obj: any = {
        status: 'failure',
        data: res.locals.data || {},
        errors: res.locals.errors || {},
        message: res.locals.message || '',
    };
    const err: any = res.locals.error;
    logger.error(err.name);
    logger.error(err.message);
    logger.error(err.stack);
    res.status(errorCode).send(obj);
};

/**
 * Success response
 */
export const JSONSUCCESS : any = (req: Request, res: Response) : void => {
    const obj: any = {
        status: 'success',
        data: {},
        errors: {},
        message: '',
    };

    if (res.locals.data) {
        obj.data = res.locals.data;
    }
    if (res.locals.errors) {
        obj.errors = res.locals.errors;
    }
    if (res.locals.message) {
        obj.message = res.locals.message;
    }

    res.status(HttpStatus.OK).send(obj);
};
