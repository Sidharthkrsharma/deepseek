import mongoose from "mongoose";

let cached = global.mongoose || {conn: null, process: null};

export default async function connectDB(){
    if(cached.conn) return cached.conn;
    if(!cached.promise){
        cached.promise = mongoose.connect(process.env.MONGODB_URL).then((mongoose) => mongoose);
    }
    try {
        cached.conn = await cached.promise;
    } catch (error) {
        console.error("Enter connecting to MongoDB:", error);
    }
    return cached.conn;
}