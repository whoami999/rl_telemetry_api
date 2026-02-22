import { Request, Response, NextFunction } from 'express';
import { TelemetryService } from '../services/telemetry.service';
import { AppError } from '../configs/app-error.config';
import { E_TeleDataStatus } from '../enums/telemetry.enums';

export class TelemetryController {
    private telemetryService: TelemetryService;

    constructor() {
        this.telemetryService = new TelemetryService();
    }

    getAllTelemetries = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const satelliteId = req.query?.satelliteId as string;
            const status = req.query?.status as E_TeleDataStatus;
            const teleId = req.params?.id as string;

            const telemetries = await this.telemetryService.getTelemetries(teleId, status, satelliteId);
            res.status(200).json(telemetries);
        } catch (error) {
            next(error);
        }
    };

    getTelemetryById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            if (typeof req.params.id !== 'string') {
                throw new AppError(400, 'Invalid telemetry ID');
            }

            const telemetries = await this.telemetryService.getTelemetries(req.params.id);
            res.status(200).json(telemetries);
        } catch (error) {
            next(error);
        }
    };

    createTelemetry = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const newTelemetry = await this.telemetryService.createTelemetry(req.body);
            res.status(201).json(newTelemetry);
        } catch (error) {
            next(error);
        }
    };


    deleteTelemetry = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            if (!req.params.id || typeof req.params.id !== 'string') {
                throw new AppError(400, 'Invalid telemetry ID');
            }
            const newTelemetries = await this.telemetryService.deleteTelemetry(req.params.id);
            res.status(200).json(newTelemetries);
        } catch (error) {
            next(error);
        }
    }
}