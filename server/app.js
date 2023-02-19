import express from 'express';
import User from './routes/userRoute.js'
export const app  = express();


app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/api/v1',User);