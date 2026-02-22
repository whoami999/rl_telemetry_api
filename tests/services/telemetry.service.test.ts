import { TelemetryService } from '../../src/services/telemetry.service';
import { TelemetryRepository } from '../../src/models/telemetry.model';
import { E_TeleDataStatus } from '../../src/enums/telemetry.enums';
import { ITelemetryData } from '../../src/interfaces/telemetry.interface';

jest.mock('../../src/models/telemetry.model');

describe('TelemetryService', () => {
    let service: TelemetryService;
    let mockRepository: jest.Mocked<TelemetryRepository>;

    beforeEach(() => {
        jest.clearAllMocks();

        service = new TelemetryService();
        mockRepository = (service as any).telemetryRepository;
    });

    describe('getTelemetries', () => {
        const mockData: ITelemetryData[] = [
            {
                id: '1',
                satelliteId: 'TestSat',
                altitude: 1000,
                status: E_TeleDataStatus.HEALTHY,
                timestamp: '2026-02-27T10:00:00',
                velocity: 5000
            }
        ];

        it('should call getAll when no parameters provided', async () => {
            mockRepository.getAll.mockResolvedValue(mockData);

            const result = await service.getTelemetries();

            expect(mockRepository.getAll).toHaveBeenCalledTimes(1);
            expect(result).toEqual(mockData);
        });

        it('should call getTelemetryById when telemetryId provided', async () => {
            mockRepository.getTelemetryById.mockResolvedValue(mockData);

            const result = await service.getTelemetries('test-id');

            expect(mockRepository.getTelemetryById).toHaveBeenCalledWith('test-id');
            expect(result).toEqual(mockData);
        });

        it('should call getTelemetryByQuery when status provided', async () => {
            mockRepository.getTelemetryByQuery.mockResolvedValue(mockData);

            const result = await service.getTelemetries(null, E_TeleDataStatus.HEALTHY);

            expect(mockRepository.getTelemetryByQuery).toHaveBeenCalledWith({
                status: E_TeleDataStatus.HEALTHY,
                satelliteId: undefined
            });
            expect(result).toEqual(mockData);
        });

        it('should call getTelemetryByQuery when satelliteId provided', async () => {
            mockRepository.getTelemetryByQuery.mockResolvedValue(mockData);

            const result = await service.getTelemetries(null, null, 'TestSat');

            expect(mockRepository.getTelemetryByQuery).toHaveBeenCalledWith({
                status: undefined,
                satelliteId: 'TestSat'
            });
            expect(result).toEqual(mockData);
        });
    });

    describe('createTelemetry', () => {
        const newTelemetry: ITelemetryData = {
            id: 'new-123',
            satelliteId: 'NewSat',
            altitude: 2000,
            status: E_TeleDataStatus.HEALTHY,
            timestamp: '2026-02-27T12:00:00',
            velocity: 6000
        };

        it('should create telemetry successfully', async () => {
            mockRepository.create.mockResolvedValue(newTelemetry);

            const result = await service.createTelemetry(newTelemetry);

            expect(mockRepository.create).toHaveBeenCalledWith(newTelemetry);
            expect(result).toEqual(newTelemetry);
        });

    });

    describe('deleteTelemetry', () => {
        it('should delete telemetry successfully', async () => {
            const mockResult: ITelemetryData[] = [];
            mockRepository.deleteTelemetry.mockResolvedValue(mockResult);

            const result = await service.deleteTelemetry('test-id');

            expect(mockRepository.deleteTelemetry).toHaveBeenCalledWith('test-id');
            expect(result).toEqual(mockResult);
        });
    });
});
