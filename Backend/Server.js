import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloundinary.js';
import userRouter from './routes/userRoute.js';
import cartRouter from './routes/cartRoute.js';
import productRouter from './routes/productRoute.js';
import orderRouter from './routes/orderRoute.js';

dotenv.config();



const app = express();
const port = process.env.PORT || 4000;
connectDB();
connectCloudinary();

//middleware
app.use(express.json());
app.use(cors());
 

//api endpoint

app.use('/api/user' , userRouter)
app.use('/api/product' , productRouter)
app.use('/api/cart' , cartRouter);
app.use('/api/order' , orderRouter)



app.listen(port, () => {
    console.log(`Server running on port http://localhost:${port}`);
});