import cors from 'cors';
import express, { Application, NextFunction, Request, Response } from 'express';
import bodyParser from 'body-parser';
import httpStatus from 'http-status';
import routes from './app/routes';
import cookieParser from 'cookie-parser';
import globalErrorHandler from './app/middleWares/globalErrorHandlers';

const app: Application = express();

const allowedOrigins = [
  'https://deligo-frontend.vercel.app',
  'http://localhost:3000',
  'http://localhost:3001',
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, origin);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

app.options('*', cors());  // handle preflight


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
  res.status(200).json({ status: 'OK', message: 'Server is running' });
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