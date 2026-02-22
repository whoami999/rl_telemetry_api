import { Request, Response, NextFunction } from 'express';
import { body, checkExact, query, validationResult } from 'express-validator';
import { AppError } from '../app-error.config';
import { E_TeleDataStatus } from '../../enums/telemetry.enums';

export const validate = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next();
    }
    return res.status(400).json({
        status: 'error',
        errors: errors.array()
    })
};

export const telemetryValidationForSavingRules = [
    body('satelliteId').isString().withMessage('Invalid String for Satellite Id'),
    body('timestamp').isISO8601().withMessage('Invalid iso String, format needs to be YYYY-MM-DDTHH:mm:ss'),
    body('id').isUUID().withMessage('Invalid string for ID: needs to be a UUID'),
    body('altitude').isNumeric().withMessage('Invalid, needs to be a number')
        .custom((value) => value >= 0).withMessage('Altitude must be 0 or greater'),
    body('velocity').isNumeric().withMessage('Invalid number').custom((value) => value >= 0),
    body('status').isString().withMessage('Invalid String')
                .isIn(Object.values(E_TeleDataStatus)).withMessage(`Status must be one of : ${Object.values(E_TeleDataStatus).join(', ')}`) // need this to check it is one of the E_TeleDataStatus enum values

];

export const telemetryValidationForQueryRules = [
    query('status').optional().isString().isIn(Object.values(E_TeleDataStatus)).withMessage(`Must be one of : ${Object.values(E_TeleDataStatus).join(', ')}`),
    query('satelliteId').optional().isString().withMessage('Invalid string'),
    checkExact([], {
        message: 'Unknown Parameters, pagination isn\'t implemented yet, valid params are satelliteId and status'
    }),
]



