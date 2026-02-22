import express, { Application, Request, Response } from 'express';
import telemetryRoutes from './routes/telemetry.routes';
import { corsOptions } from './configs/cors.config';
import cors from 'cors';

const app: Application = express();
const PORT = process.env.PORT || 3000;

app.use(cors(corsOptions))


app.use(express.json());

app.use('/telemetry', telemetryRoutes)

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World! Your API endpoint is working!!!!');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
