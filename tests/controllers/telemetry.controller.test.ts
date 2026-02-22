import request from 'supertest';
import express, { Express } from 'express';
import telemetryRoutes from '../../src/routes/telemetry.routes';
import { E_TeleDataStatus } from '../../src/enums/telemetry.enums';

describe('Telemetry Controller Integration Tests', () => {
    let app: Express;

    beforeAll(() => {
        app = express();
        app.use(express.json());
        app.use('/api/telemetry', telemetryRoutes);
        
      
        app.use((err: any, req: any, res: any, next: any) => {
            res.status(err.statusCode || 500).json({
                status: 'error',
                message: err.message
            });
        });
    });

    describe('GET /api/telemetry', () => {
        it('should return all telemetry data', async () => {
            const response = await request(app)
                .get('/api/telemetry')
                .expect(200);

            expect(response.body).toBeInstanceOf(Array);
            expect(response.body.length).toBeGreaterThan(0);
        });

        it('should filter by satelliteId', async () => {
            const response = await request(app)
                .get('/api/telemetry?satelliteId=Alice')
                .expect(200);

            expect(response.body).toBeInstanceOf(Array);
            response.body.forEach((item: any) => {
                expect(item.satelliteId).toBe('Alice');
            });
        });

        it('should filter by status', async () => {
            const response = await request(app)
                .get('/api/telemetry?status=healthy')
                .expect(200);

            expect(response.body).toBeInstanceOf(Array);
            response.body.forEach((item: any) => {
                expect(item.status).toBe(E_TeleDataStatus.HEALTHY);
            });
        });

        it('should return 400 for invalid status', async () => {
            const response = await request(app)
                .get('/api/telemetry?status=invalid-status')
                .expect(400);

            expect(response.body.status).toBe('error');
        });

        it('should return 400 for unknown query parameters', async () => {
            const response = await request(app)
                .get('/api/telemetry?unknownParam=value')
                .expect(400);

            expect(response.body.status).toBe('error');
        });
    });

    describe('GET /api/telemetry/:id', () => {
        it('should return telemetry by ID', async () => {
            const response = await request(app)
                .get('/api/telemetry/48933')
                .expect(200);

            expect(response.body).toBeInstanceOf(Array);
            expect(response.body[0]?.id).toBe('48933');
        });

        it('should return 404 for non-existent ID', async () => {
            const response = await request(app)
                .get('/api/telemetry/non-existent-id')
                .expect(404);

            expect(response.body.status).toBe('error');
        });
    });

    describe('POST /api/telemetry', () => {
        it('should create new telemetry data', async () => {
            const newTelemetry = {
                id: '9206e5c7-4de6-4952-b298-0e75a0a15b3a',
                satelliteId: 'TestSat',
                altitude: 1500,
                status: E_TeleDataStatus.HEALTHY,
                timestamp: '2026-02-27T10:00:00',
                velocity: 5500
            };

            const response = await request(app)
                .post('/api/telemetry')
                .send(newTelemetry)
                .expect(201);

            expect(response.body.id).toBe(newTelemetry.id);
            expect(response.body.satelliteId).toBe(newTelemetry.satelliteId);
        });

        it('should return 400 for invalid data', async () => {
            const invalidTelemetry = {
                id: 'not-a-uuid',
                satelliteId: 'TestSat',
                altitude: 'not-a-number', // Invalid
                status: E_TeleDataStatus.HEALTHY,
                timestamp: '2026-02-27T10:00:00',
                velocity: 5500
            };

            const response = await request(app)
                .post('/api/telemetry')
                .send(invalidTelemetry)
                .expect(400);

            expect(response.body.status).toBe('error');
        });

        it('should return 400 for missing required fields', async () => {
            const incompleteTelemetry = {
                id: '99999999-1234-1234-1234-123456789012',
                satelliteId: 'TestSat'
                // Missing other required fields
            };

            const response = await request(app)
                .post('/api/telemetry')
                .send(incompleteTelemetry)
                .expect(400);

            expect(response.body.status).toBe('error');
        });

        it('should return 400 for invalid status enum', async () => {
            const invalidStatus = {
                id: '99999999-1234-1234-1234-123456789012',
                satelliteId: 'TestSat',
                altitude: 1500,
                status: 'invalid-status',
                timestamp: '2026-02-27T10:00:00',
                velocity: 5500
            };

            const response = await request(app)
                .post('/api/telemetry')
                .send(invalidStatus)
                .expect(400);

            expect(response.body.status).toBe('error');
        });

        it('should return 400 for negative altitude', async () => {
            const negativeAltitude = {
                id: '99999999-1234-1234-1234-123456789012',
                satelliteId: 'TestSat',
                altitude: -100,
                status: E_TeleDataStatus.HEALTHY,
                timestamp: '2026-02-27T10:00:00',
                velocity: 5500
            };

            const response = await request(app)
                .post('/api/telemetry')
                .send(negativeAltitude)
                .expect(400);

            expect(response.body.status).toBe('error');
        });
    });
});
