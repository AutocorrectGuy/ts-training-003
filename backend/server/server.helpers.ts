import { port } from "./server.config.json"
import path from "path"
require("dotenv").config({ path: path.join(__dirname, "../../.env") })

/**
 * Returns static path from frondend build folder
 */
export const __frontend_path: string = path.join(__dirname, "../../frontend/build")

/**
 * Returns index.html path from frontend build folder
 */
export const __frontend_index_html: string = path.join(__frontend_path, "/index.html")

/**
 * Returns port string which is automatically created from heroku or
 * from server.config.json file if not deploying on heroku  
 */
export const PORT: string | number = process.env.PORT || port