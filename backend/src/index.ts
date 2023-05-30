import * as dotenv from 'dotenv';
import express from 'express';
import connectToDb from './utils/database';
import { errorHandlerMiddleware } from './middlewares/errorHandlerMiddleware';

dotenv.config();

connectToDb();

const app = express();
const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 8080;

app.use(errorHandlerMiddleware); // Must be at end

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${port}`);
});
