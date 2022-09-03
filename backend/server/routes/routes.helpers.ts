import mongoose from "mongoose"

const ATLAS_URI = "mongodb+srv://admin:uzdevumi1!@cluster0.r3rajio.mongodb.net/?retryWrites=true&w=majority"
export const REGISTER_USER_SECRET = "0123"
export const USER_TYPE = {
  MATCHED: "employee",
  NOT_MATCHED: "student"
}

export const createMongoConnection = () => mongoose.connect(ATLAS_URI)

export const DB_NAMES = {
  DB: "auth",
  COLLECTIONS: {
    JWT_TOKENS: "jwt-refresh-tokens",
    USERS: "users"
  }
}