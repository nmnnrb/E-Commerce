import mongoose from 'mongoose';

const connectDB = async () => {
    mongoose.connection.on('connected' , () => {
        console.log(`Mongoose connected`);
    })
        await mongoose.connect(`mongodb+srv://nmnnrb:nmnnrb@cluster0.d3yw8.mongodb.net/e-commerce`)
}



export default connectDB; 