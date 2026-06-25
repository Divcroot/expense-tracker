import dns from 'dns'
dns.setServers(["8.8.8.8", "8.8.4.4"])
import express from 'express'
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from "url";
import dotenv from 'dotenv'
import { connectDB } from './config/db.js'
import authRouter from './routes/authRoutes.js'
import incomeRouter from './routes/incomeRoutes.js'
import expenseRouter from './routes/expenseRoutes.js'
import { dashboardRouter } from './routes/dashboardRoutes.js'
dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

//Middleware to hande CORS
app.use(cors({
    origin: process.env.CLIENT_URL || "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
}))

app.use(express.json())

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/income', incomeRouter)
app.use('/api/v1/expense', expenseRouter)
app.use('/api/v1/dashboard', dashboardRouter)

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/uploads", express.static(path.join(__dirname, "uploads")))

const startServer = async () => {
    try {
        await connectDB()

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`)
        })
    } catch (error) {
        console.error("Error in starting Server: ", error)
        process.exit(1)
    }
}

startServer()