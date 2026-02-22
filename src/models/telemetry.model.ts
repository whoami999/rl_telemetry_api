// For this example, we use an in-memory array
import { AppError } from '../configs/app-error.config';
import { E_TeleDataStatus } from '../enums/telemetry.enums';
import { ITelemetryData } from '../interfaces/telemetry.interface';

let telemetriesRepo: ITelemetryData[] = [];

export class TelemetryRepository {
    getAll(): Promise<ITelemetryData[]> {
        return Promise.resolve(telemetriesRepo);
    }

    async getTelemetryById(telemetryId: string): Promise<ITelemetryData[]> {
        const singletonTelemetry = telemetriesRepo.filter(t => t.id === telemetryId);
        if (singletonTelemetry.length === 0) {
            throw new AppError(404, `Telemetry with ID ${telemetryId} does not exist`);
        }
        return singletonTelemetry;
    }

    async getTelemetryByQuery(queryParams: { satelliteId?: string | null | undefined, status?: E_TeleDataStatus | null | undefined }): Promise<ITelemetryData[]> {
        const telemetryData = telemetriesRepo.filter(tel => {
            const matchesSatellite = !queryParams.satelliteId || tel.satelliteId === queryParams.satelliteId;
            const matchesStatus = !queryParams.status || tel.status === queryParams.status;
            return matchesSatellite && matchesStatus;
        });
        return telemetryData;
    }

    create(telemetry: ITelemetryData): Promise<ITelemetryData> {
        telemetriesRepo.push(telemetry);
        return Promise.resolve(telemetry);
    }

    deleteTelemetry(telemetryId: string): Promise<ITelemetryData[]> {
        const initialLength = telemetriesRepo.length;
        telemetriesRepo = telemetriesRepo.filter(tel => tel.id !== telemetryId);
        
        if (telemetriesRepo.length === initialLength) {
            throw new AppError(404, `Telemetry with ID ${telemetryId} not found`);
        }
        
        return Promise.resolve(telemetriesRepo);
    }
}