// For this example, we use an in-memory array
import { AppError } from '../configs/app-error.config';
import { E_TeleDataStatus } from '../enums/telemetry.enums';
import { ITelemetryData } from '../interfaces/telemetry.interface';

let telemetriesRepo: ITelemetryData[] = [
    { id: '48933', satelliteId: 'Blue', altitude: 0, status: E_TeleDataStatus.CRITICAL, timestamp: '2026-02-22T22:11:33', velocity: 3243 },
    { id: '48231', satelliteId: 'Alice', altitude: 0, status: E_TeleDataStatus.HEALTHY, timestamp: '2026-02-23T00:41:23', velocity: 1231 },
    { id: '48414', satelliteId: 'Gold', altitude: 0, status: E_TeleDataStatus.LOST, timestamp: '2026-02-24T09:11:43', velocity: 2424 },
    { id: '48111', satelliteId: 'Scarecrow', altitude: 0, status: E_TeleDataStatus.HEALTHY, timestamp: '2026-02-25T15:12:13', velocity: 4111 },
    { id: '48211', satelliteId: 'Alice', altitude: 0, status: E_TeleDataStatus.CRITICAL, timestamp: '2026-02-26T13:12:13', velocity: 3121 }
];

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