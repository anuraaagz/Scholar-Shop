import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRouter from './routes/authRoute.js';
import productRouter from './routes/productRoute.js';
import cookieParser from 'cookie-parser';

dotenv.config();

mongoose.connect(process.env.MONGO).then(()=>{
    console.log('Connected to MongoDB!');
}).catch((err)=>{
    console.log(err);
});

const app = express();
app.use(cookieParser);

app.listen(3000,()=>{
    console.log("Server Is Running")
})

app.use('/api/auth/',authRouter);
app.use('/api/product/',productRouter);

app.use((err, req, res, next) => {
    const statusCode =err.statusCode;
    const message = err.message;

    return res.status(statusCode),json({
        success:false,
        statusCode,
        message,
    });
} );