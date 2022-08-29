import express, { static as Static } from "express"
import { __frontend_index_html, __frontend_path, PORT } from "./server.helpers"

const app = express()

app.use(Static(__frontend_path))

app.get("*", (req, res) => res.sendFile(__frontend_index_html))

app.listen(PORT, () => console.log("Listening to port ", PORT))