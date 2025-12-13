import { ENV } from "./env.js";
import mongoose from "mongoose"

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(ENV.DB_URL);
        console.log("connected to the database", conn.connection.host)
    } catch (error) {
        console.log("error connecting to the database", error)
        process.exit(1)
    }
}