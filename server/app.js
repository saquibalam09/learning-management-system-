import express from 'express';

import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import userRoutes from './routes/user.route.js';
import miscRoutes from './routes/miscellaneous.routes.js'
import courseRoutes from './routes/course.route.js'
import paymentRoutes from './routes/payment.route.js'
import errorMiddleware from './middlewares/error.middleware.js';
import { config } from 'dotenv';
config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));


app.use(cookieParser());
app.use(morgan('dev'));

// app.use('/ping', function(_req, res){
//     res.send('/pong');   
// })

app.use('/api/v1/user', userRoutes);
app.use('/api/v1/courses', courseRoutes);
app.use('/api/v1/payments', paymentRoutes);
app.use('/api/v1', miscRoutes);


// routes of 3 modules

app.all('*', (_req, res)=>{
    res.status(404).send('OOPS!! 404 page not found')
})

app.use(errorMiddleware);

export default app;
// module.exports=app;
