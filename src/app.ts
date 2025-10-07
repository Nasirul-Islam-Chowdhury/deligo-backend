import cors from 'cors';
import express, { Application, NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import routes from './app/routes';
import cookieParser from 'cookie-parser';
import globalErrorHandler from './app/middleWares/globalErrorHandlers';

const app: Application = express();

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:8000',
  credentials: true,
}));



app.use(cookieParser());

//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/api/v1', routes);


// Health Check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Server is running' });
});


//Testing
app.get('/', async (req: Request, res: Response, next: NextFunction) => {
  throw new Error('Testing Error logger')
})

//global error handler
app.use(globalErrorHandler);

//handle not found
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'Not Found',
    errorMessages: [
      {
        path: req.originalUrl,
        message: 'API Not Found',
      },
    ],
  });
  next();
});

export default app;