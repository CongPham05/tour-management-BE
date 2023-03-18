import express from "express";
import dotenv from "dotenv"
import mongoose from "mongoose";
import cors from 'cors'
import cookieParser from "cookie-parser";

import tourRoute from './routes/tours.js'
import userRoute from './routes/users.js'
import authRoute from './routes/auth.js'
import reviewRoute from './routes/reviews.js'
import bookingRoute from './routes/bookings.js'

dotenv.config();
const app = express();
const port = process.env.PORT || 8000;

/**
 *  origin - Được thiết lập thành true, 
 *  cho phép tất cả các nguồn có thể truy cập các tài nguyên trong ứng dụng.
 *  Nếu bạn muốn chỉ cho phép một số nguồn cụ thể, 
 *  bạn có thể thiết lập thuộc tính này bằng đường dẫn URL của nguồn đó.
 *  credentials - Được thiết lập thành true,
 *  cho phép trình duyệt gửi các thông tin xác thực (như cookie hoặc token) trong các yêu cầu CORS.
 */
const corsOptions = {
    // origin: true,
    origin: ["http://localhost:3000", "https://tourfe.onrender.com"],
    credentials: true
}

//Database connect
mongoose.set("strictQuery", false);
const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log('MongoDB database connected OK!')
    } catch (error) {
        console.log('MongoDB database connected FAILED!')
    }
}

//middleware 
app.use(express.json())
app.use(cors(corsOptions))
app.use(cookieParser())

app.use('/api/v1/tours', tourRoute)
app.use('/api/v1/users', userRoute)
app.use('/api/v1/auth', authRoute)
app.use('/api/v1/review', reviewRoute)
app.use('/api/v1/booking', bookingRoute)




app.listen(port, () => {
    connect();
    console.log('Server listening on port', port)
})
