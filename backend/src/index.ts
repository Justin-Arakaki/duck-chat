import './utils/setupDotenv';
import express from 'express';
import { errorHandlerMiddleware } from './middlewares/errorHandlerMiddleware';
import connectToDb from './utils/database';

connectToDb();

const app = express();
const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 8080;

app.use(express.json());

// app.use('/api', routes);

app.use(errorHandlerMiddleware); // Must be at end

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${port}`);
});
