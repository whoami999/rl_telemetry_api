import { Router } from 'express';
import { TelemetryController } from '../controllers/telemetry.controller';
import { telemetryValidationForQueryRules, telemetryValidationForSavingRules, validate } from '../configs/middleware/validate';

const router = Router();
const telemetryController = new TelemetryController();

router.get('/', telemetryValidationForQueryRules, validate, telemetryController.getAllTelemetries);
router.get('/:id', telemetryController.getTelemetryById);
router.post('/', telemetryValidationForSavingRules, validate, telemetryController.createTelemetry);
router.delete('/:id', telemetryController.deleteTelemetry);

export default router;
