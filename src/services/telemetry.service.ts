import { TelemetryRepository } from '../models/telemetry.model';
import { ITelemetryData } from '../interfaces/telemetry.interface';
import { E_TeleDataStatus } from '../enums/telemetry.enums';
import { AppError } from '../configs/app-error.config';

export class TelemetryService {
  private telemetryRepository: TelemetryRepository;

  constructor() {
    this.telemetryRepository = new TelemetryRepository();
  }

  async getTelemetries(telemetryId?: string | null | undefined, status?: E_TeleDataStatus | null | undefined, satelliteId?: string | null | undefined): Promise<ITelemetryData[]> {
    if (!telemetryId && !status && !satelliteId) {
        return this.telemetryRepository.getAll();
    } else if (telemetryId) {
        return this.telemetryRepository.getTelemetryById(telemetryId);
    } else if (status || satelliteId) {
        return this.telemetryRepository.getTelemetryByQuery({ 
            status: status ?? undefined, 
            satelliteId: satelliteId ?? undefined 
        });
    }
    throw new AppError(404, 'Telemetry endpoint not implemented for parameters given');
  }

  async createTelemetry(telemetryData: ITelemetryData): Promise<ITelemetryData> {
    return this.telemetryRepository.create(telemetryData);
  }

  async deleteTelemetry(telemetryId: string): Promise<ITelemetryData[]> {
    return this.telemetryRepository.deleteTelemetry(telemetryId);
  }
}
