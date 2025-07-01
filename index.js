import express from 'express'
import cors from 'cors';
import mongoose from 'mongoose';
import { MONGOURI } from './config/env.js';
import { userRoute } from './routes/user-route.js';
import { postRoute } from './routes/post-route.js';

const app = express();

app.use(express.json());
app.use(cors())

const PORT = process.env.PORT || 6003;
await mongoose.connect(MONGOURI)

app.use('/api',userRoute);
app.use('/api',postRoute);
app.listen(PORT, ()=> {
    console.log(`server running on PORT:${PORT}`)
});