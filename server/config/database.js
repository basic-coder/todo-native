import mongoose from "mongoose";

mongoose.set("strictQuery",true)

export const connectDB = async() =>{
    try {
        const {connection} = await mongoose.connect(process.env.MONGO_URI);
        console.log("Mongo Db connected:", connection.host);
    } catch (error) {
        process.exit(1);
    }
}