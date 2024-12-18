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
app.get('/', (req, res) => {
    res.send(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>E-Commerce Project</title>
           <script src="https://cdn.tailwindcss.com"></script>
        </head>
        <body class="bg-gray-100 flex flex-col justify-center items-center item-center text-center  container h-screen p-8">
          <h1 class="text-5xl text-indigo-600  font-bold">API Working</h1>
          <p class="text-xl text-black  mt-2 font-bold" >For the E-Commerce Project - by Naman Sharma</p>
          <p class="text-3xl text-green-500  mt-6 font-bold" >Now you checkout the client <a class="bg-blue-500 hover:bg-blue-600 text-white px-3 py-3 rounded-xl"  href="https://e-commerce-4zy9.onrender.com/"> click here </a> </p>
        </body>
      </html>
    `);
  });
  


app.listen(port, () => {
    console.log(`Server running on port http://localhost:${port}`);
});
