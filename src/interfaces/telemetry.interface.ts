import { E_TeleDataStatus } from "../enums/telemetry.enums";

export interface ITelemetryData {
    id: string;
    satelliteId: string;
    timestamp: string;
    altitude: number;
    velocity: number;
    status: E_TeleDataStatus;
}

