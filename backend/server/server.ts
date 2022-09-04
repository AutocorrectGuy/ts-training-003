import express, { static as Static } from "express"
import { __frontend_index_html, __frontend_path, PORT, getEnv } from "./server.helpers"
import authRoutes from "./routes/auth/auth.routes"
import bodyParser from "body-parser"
import cookieParser from "cookie-parser"
import cors from "cors"


const app = express()
const origin = "://training-003.herokuapp.com/"
app.use(cors({
  origin: getEnv("NODE_ENV")
    ? [`htttp${origin}`, `htttps${origin}`] 
    : "http://localhost:3000",
  credentials: true
}))

// middleware
app.use(bodyParser.json())


app.use(cookieParser())
app.use(Static(__frontend_path))

// routes
app.use("/api", authRoutes)

app.get("*", (req, res) => res.sendFile(__frontend_index_html))

app.listen(PORT, () => console.log("Listening to port ", PORT))