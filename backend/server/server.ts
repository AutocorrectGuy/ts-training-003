import express, { static as Static } from "express"
import { __frontend_index_html, __frontend_path, PORT } from "./server.helpers"
import authRoutes from "./routes/auth/auth.routes"
import bodyParser from "body-parser"
import cookieParser from "cookie-parser"
import cors from "cors"


const app = express()

// enambling Cross Origin Resource Sharing

// for cors to work, origin: string and credentials: boolean = true is needed
const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,            //access-control-allow-credentials:true

}

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}))

// middleware
app.use(bodyParser.json())


app.use(cookieParser())
app.use(Static(__frontend_path))

// routes
app.use("/api", authRoutes)

const teplatePosts = [
  {
    id: 1,
    name: "test1"
  },
  {
    id: 2,
    name: "test1"
  },
  {
    id: 3,
    name: "test1"
  }
]

app.get("/api/secret", (req, res) => {
  res.status(200).json(teplatePosts)
})
app.get("*", (req, res) => res.sendFile(__frontend_index_html))

app.listen(PORT, () => console.log("Listening to port ", PORT))