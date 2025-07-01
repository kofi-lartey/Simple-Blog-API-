import dotenv from 'dotenv'

dotenv.config();

export const MONGOURI = process.env.MONGO_URI

export const SECRET = process.env.JWT_SECRET
