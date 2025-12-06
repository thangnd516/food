import mongoose from "mongoose";

const dbConect = async () => {
    if (mongoose.connection.readyState >= 1) {
        return
    }
    try{
        await mongoose.connect(process.env.DB_URI)

    }catch(error){
        console.log("db connection failed ", error.message);
    }
}
export default dbConect;