import { ITelemetryData } from '../../src/interfaces/telemetry.interface';
import { E_TeleDataStatus } from '../../src/enums/telemetry.enums';

/**
 * Creates a mock telemetry data object with default values
 * Override any properties by passing them in the partial object
 */
export const createMockTelemetry = (partial?: Partial<ITelemetryData>): ITelemetryData => {
    return {
        id: 'test-id-123',
        satelliteId: 'TestSat',
        altitude: 1000,
        status: E_TeleDataStatus.HEALTHY,
        timestamp: '2026-02-27T10:00:00',
        velocity: 5000,
        ...partial
    };
};

/**
 * Creates an array of mock telemetry data
 */
export const createMockTelemetryArray = (count: number): ITelemetryData[] => {
    return Array.from({ length: count }, (_, i) => 
        createMockTelemetry({
            id: `test-id-${i}`,
            satelliteId: `Sat-${i}`
        })
    );
};

/**
 * Generates a valid UUID v4 for testing
 */
export const generateTestUUID = (): string => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
};
