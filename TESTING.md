# Testing Guide

## Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run tests:**
   ```bash
   npm test
   ```

3. **Watch mode (auto-rerun on changes):**
   ```bash
   npm run test:watch
   ```

4. **Coverage report:**
   ```bash
   npm run test:coverage
   ```

## What's Included

### Test Files
- `tests/models/telemetry.model.test.ts` - Repository layer tests
- `tests/services/telemetry.service.test.ts` - Service layer tests with mocks
- `tests/controllers/telemetry.controller.test.ts` - Integration tests with supertest
- `tests/setup/test-helpers.ts` - Utility functions for creating test data

### Configuration
- `jest.config.js` - Jest configuration
- `package.json` - Updated with test scripts and dependencies

## Test Examples

### Testing Create Operation
```typescript
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
});
```

### Testing Delete Operation
```typescript
it('should delete existing telemetry data', async () => {
    // Create test data
    await repository.create(testTelemetry);
    
    // Delete it
    const result = await repository.deleteTelemetry('test-id');
    
    // Verify deletion
    const found = result.find(item => item.id === 'test-id');
    expect(found).toBeUndefined();
});
```

### Testing with Supertest (Integration)
```typescript
it('should create new telemetry via API', async () => {
    const response = await request(app)
        .post('/api/telemetry')
        .send(newTelemetry)
        .expect(201);

    expect(response.body.id).toBe(newTelemetry.id);
});
```

## Dependencies Installed

- `jest` - Testing framework
- `ts-jest` - TypeScript support for Jest
- `@types/jest` - TypeScript types for Jest
- `supertest` - HTTP integration testing
- `@types/supertest` - TypeScript types for supertest

## Next Steps

1. Run `npm install` to install the new dependencies
2. Run `npm test` to execute all tests
3. Check `tests/README.md` for detailed documentation
4. Add more tests as you develop new features

## Troubleshooting

**Issue: Tests not running**
- Ensure you ran `npm install` after updating package.json
- Check that `jest.config.js` exists in the root directory

**Issue: TypeScript errors in tests**
- Verify `@types/jest` is installed
- Check `tsconfig.json` includes test files

**Issue: Module not found errors**
- Check import paths are correct (relative to test file location)
- Ensure source files are in `src/` directory

## Coverage Reports

After running `npm run test:coverage`, open `coverage/lcov-report/index.html` in your browser to see a detailed coverage report.

Target coverage goals:
- Statements: > 80%
- Branches: > 75%
- Functions: > 80%
- Lines: > 80%
