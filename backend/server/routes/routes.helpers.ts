import mongoose from "mongoose"
import { getEnv } from "../server.helpers"

export const REGISTER_USER_SECRET = <string>getEnv("REGISTER_USER_SECRET")

export const USER_TYPE = { MATCHED: "employee", NOT_MATCHED: "student" }

export const createMongoConnection = () => mongoose.connect(<string>getEnv("ATLAS_URI"))

export const DB_NAMES = {
  DB: "auth",
  COLLECTIONS: {
    JWT_TOKENS: "jwt-refresh-tokens",
    USERS: "users"
  }
}