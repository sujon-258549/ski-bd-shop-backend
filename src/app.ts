import express, { Application, Request, Response } from 'express';
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

const app: Application = express();
import cors from 'cors';
import globalErrorHandler from './app/Error/globalerrorhandalar';
import notFound from './app/Error/notfound';
import router from './app/Router';

app.use(express.json());
app.use(
  cors({
    origin: [
      'http://localhost:5173',
      'https://zoom-it-mern-stack-frontend.vercel.app',
      'https://skl-bd-shop.vercel.app',
    ],
  }),
);

app.use('/api', router);

app.get('/', (req: Request, res: Response) => {
  res.send('Skl bg this is Ecommerce app');
});
app.use(globalErrorHandler);
app.use(notFound);
export default app;
