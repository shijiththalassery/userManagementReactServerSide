import mongoose from "mongoose";

const connectDB = async():Promise<void>=>{
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/ReactUserManagementSystem')
    console.log('database running...')
    } catch (error) {
        console.log('Error conncting to mongo DB',error)
    }
}

export default connectDB