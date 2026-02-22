import { TelemetryRepository } from '../../src/models/telemetry.model';
import { E_TeleDataStatus } from '../../src/enums/telemetry.enums';
import { ITelemetryData } from '../../src/interfaces/telemetry.interface';

describe('TelemetryRepository', () => {
    let repository: TelemetryRepository;

    beforeEach(() => {
        repository = new TelemetryRepository();
    });

    describe('getAll', () => {
        it('should return all telemetry data', async () => {
            const result = await repository.getAll();
            expect(result).toBeInstanceOf(Array);
            expect(result.length).toBeGreaterThan(0);
        });
    });

    describe('getTelemetryById', () => {
        it('should return telemetry data for valid ID', async () => {
            const result = await repository.getTelemetryById('48933');
            expect(result).toBeInstanceOf(Array);
            expect(result.length).toBe(1);
            expect(result[0]?.id).toBe('48933');
        });

        it('should throw error for non-existent ID', async () => {
            await expect(repository.getTelemetryById('non-existent-id'))
                .rejects
                .toThrow('does not exist');
        });
    });

    describe('getTelemetryByQuery', () => {
        it('should filter by satelliteId only', async () => {
            const result = await repository.getTelemetryByQuery({ satelliteId: 'Alice' });
            expect(result.length).toBeGreaterThan(0);
            result.forEach(item => {
                expect(item.satelliteId).toBe('Alice');
            });
        });

        it('should filter by status only', async () => {
            const result = await repository.getTelemetryByQuery({ status: E_TeleDataStatus.HEALTHY });
            expect(result.length).toBeGreaterThan(0);
            result.forEach(item => {
                expect(item.status).toBe(E_TeleDataStatus.HEALTHY);
            });
        });

        it('should filter by both satelliteId and status', async () => {
            const result = await repository.getTelemetryByQuery({ 
                satelliteId: 'Alice', 
                status: E_TeleDataStatus.CRITICAL 
            });
            result.forEach(item => {
                expect(item.satelliteId).toBe('Alice');
                expect(item.status).toBe(E_TeleDataStatus.CRITICAL);
            });
        });

        it('should return empty array when no matches found', async () => {
            const result = await repository.getTelemetryByQuery({ 
                satelliteId: 'NonExistent' 
            });
            expect(result).toEqual([]);
        });
    });

    describe('create', () => {
        it('should add new telemetry data', async () => {
            const newTelemetry: ITelemetryData = {
                id: 'test-123',
                satelliteId: 'TestSat',
                altitude: 1000,
                status: E_TeleDataStatus.HEALTHY,
                timestamp: '2026-02-27T10:00:00',
                velocity: 5000
            };

            const result = await repository.create(newTelemetry);
            expect(result).toEqual(newTelemetry);

            const allData = await repository.getAll();
            const found = allData.find(item => item.id === 'test-123');
            expect(found).toBeDefined();
            expect(found?.satelliteId).toBe('TestSat');
        });
    });

    describe('deleteTelemetry', () => {
        it('should delete existing telemetry data', async () => {

            const testTelemetry: ITelemetryData = {
                id: 'delete-test-123',
                satelliteId: 'DeleteTest',
                altitude: 500,
                status: E_TeleDataStatus.LOST,
                timestamp: '2026-02-27T11:00:00',
                velocity: 3000
            };
            await repository.create(testTelemetry);

            const result = await repository.deleteTelemetry('delete-test-123');
            expect(result).toBeInstanceOf(Array);

            const found = result.find(item => item.id === 'delete-test-123');
            expect(found).toBeUndefined();
        });

        it('should throw error when deleting non-existent ID', async () => {

            const initialData = await repository.getAll();
            const initialLength = initialData.length;

            try {
                await repository.deleteTelemetry('non-existent-id');
                fail('Expected deleteTelemetry to throw an error');
            } catch (error: any) {
                expect(error.message).toContain('not found');
                expect(error.statusCode).toBe(404);
            }
            const afterData = await repository.getAll();
            expect(afterData.length).toBe(initialLength);
            expect(afterData).toEqual(initialData);
        });

    });
});
