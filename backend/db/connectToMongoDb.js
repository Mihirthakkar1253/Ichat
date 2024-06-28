import mongoose from "mongoose";

const connectToMongo=async ()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("database connected successfully");
    } catch (error) {
        throw error;
    }
}

export default connectToMongo;