# Telemetry API

# To Run Application
* Either choice, you can hit the api at http://localhost:3000/telemetry

## From Code as Source
 * npm run start


## From Docker as source
 * docker-compose up telemetry-api


# Documentation
 ## My Approach
   * Seperated out routes, controllers, models, services to support maintainability
   * Utilized postman/curl to test during development.
 ## Assumptions 
   * Keeping it as simple as possible and utilized middleware for validation


Curl Commands

*Save telemetries
curl --location 'http://localhost:3000/telemetry' \
--header 'Content-Type: application/json' \
--data '{
    "id": "b4e502c3-3cc8-4f5e-b3da-ca26b62b26a1",
    "satelliteId": A234234,
    "timestamp": "2025-02-12T23:33:23",
    "altitude": 234,
    "velocity": 234,
    "status": "healthy"
}'

*Get telemetries
curl --location 'http://localhost:3000/telemetry?satelliteId=A234234'
OR
curl --location 'http://localhost:3000/telemetry'
OR
curl --location 'http://localhost:3000/telemetry?satelliteId=A234234&status=healthy'

*Get by telemetry ID
curl --location 'http://localhost:3000/telemetry/b4e502c3-3cc8-4f5e-b3da-ca26b62b26a1'

*Delete telemetries
curl --location --request DELETE 'http://localhost:3000/telemetry/b4e502c3-3cc8-4f5e-b3da-ca26b62b26a1'