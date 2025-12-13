import express from "express";
import { ENV } from "./lib/env.js";
import { connectDB } from "./lib/db.js";
import cors from "cors"
import { serve } from "inngest/express"
import { functions, inngest } from "./lib/inngest.js";


const app = express()

app.use(express.json())

app.use(cors({
    origin: ENV.CLIENT_URL,
    credentials: true
}))

app.use("/api/inngest", serve({client: inngest, functions}))

app.get("/health", (req, res) => {
    res.status(200).json({message: "api is up and running"})
})

app.get("/books", (req, res) => {
    res.status(200).json({message: "book endpoint is up and running"})
})

// if(ENV.NODE_ENV == "production"){
//     app.use(express.static(path.join(__dirname, "../frontend/dist")));

//     app.get("/{*any}", (req,res) => {
//         res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"))
//     })
// }


const startServer = async () => {
    try {
        await connectDB()
        app.listen(ENV.PORT, () => console.log(`server started successfully on port ${ENV.PORT}`))
    } catch (error) {
        console.error("Error starting the server", error)
        process.exit(1)
    }
}

startServer()


