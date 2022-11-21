import express, {json} from "express"
import cors from "cors"
import dotenv from "dotenv"
import authRouter from "./routes/authRoute.js"



const server = express()

dotenv.config()

server.use(cors())
server.use(json())
server.use(authRouter)

server.listen(process.env.PORT, ()=>{
    console.log("servidor no ar na porta: ", process.env.PORT)
})