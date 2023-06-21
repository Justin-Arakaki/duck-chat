import './utils/setupDotenv';
import express from 'express';
import { router } from './routes';
import { errorHandlerMiddleware } from './middlewares/errorHandlerMiddleware';
import connectToDb from './utils/database';

connectToDb();

export const app = express();
const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 8080;

app.use(express.json());

app.use('/api', router);

app.use(errorHandlerMiddleware); // Must be at end

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${port}`);
});
