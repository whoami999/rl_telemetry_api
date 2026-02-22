# Telemetry API Tests

This directory contains Jest tests for the Telemetry API.

## Test Structure

```
tests/
├── models/              # Repository/Model layer tests
├── services/            # Service layer tests (with mocks)
├── controllers/         # Integration tests (with supertest)
└── README.md
```

## Running Tests

```bash
# Install dependencies first
npm install

# Run all tests
npm test

# Run tests in watch mode (auto-rerun on file changes)
npm run test:watch

# Run tests with coverage report
npm run test:coverage
```

## Test Coverage

The tests cover:

### Repository Tests (`models/telemetry.model.test.ts`)
- ✅ Get all telemetry data
- ✅ Get telemetry by ID
- ✅ Get telemetry by query (satelliteId, status, or both)
- ✅ Create new telemetry
- ✅ Delete telemetry
- ✅ Error handling for non-existent IDs

### Service Tests (`services/telemetry.service.test.ts`)
- ✅ Business logic validation (Admin satellite ID check)
- ✅ Proper delegation to repository methods
- ✅ Parameter handling (null, undefined, values)
- ✅ Mocked repository to isolate service logic

### Controller Integration Tests (`controllers/telemetry.controller.test.ts`)
- ✅ GET /api/telemetry - Get all telemetry
- ✅ GET /api/telemetry?satelliteId=X - Filter by satellite
- ✅ GET /api/telemetry?status=X - Filter by status
- ✅ GET /api/telemetry/:id - Get by ID
- ✅ POST /api/telemetry - Create telemetry
- ✅ Validation middleware testing
- ✅ Error responses (400, 404)

## Writing New Tests

### Unit Test Example (Service/Repository)
```typescript
describe('MyFunction', () => {
    it('should do something', async () => {
        const result = await myFunction();
        expect(result).toBe(expectedValue);
    });
});
```

### Integration Test Example (Controller)
```typescript
it('should return data', async () => {
    const response = await request(app)
        .get('/api/endpoint')
        .expect(200);
    
    expect(response.body).toHaveProperty('data');
});
```

## Best Practices

1. **Isolate tests**: Each test should be independent
2. **Use beforeEach**: Reset state before each test
3. **Mock external dependencies**: Use jest.mock() for services in controller tests
4. **Test edge cases**: Invalid inputs, empty arrays, null values
5. **Descriptive names**: Test names should clearly describe what they test
6. **Arrange-Act-Assert**: Structure tests clearly

## Troubleshooting

### Tests failing after code changes?
- Check if the repository state is being properly reset
- Verify mock implementations match actual signatures

### Coverage not showing?
- Run `npm run test:coverage`
- Check `coverage/` directory for HTML report

### TypeScript errors in tests?
- Ensure `@types/jest` is installed
- Check `jest.config.js` has correct `preset: 'ts-jest'`
