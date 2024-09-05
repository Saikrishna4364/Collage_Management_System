
import cors from 'cors';
import adminRouter from "./Routes/AdminRoutes.js";
 import express from "express";
const app = express()
app.use(express.json());
app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ['GET', 'POST', 'PUT', "DELETE"],
    credentials: true
}));
app.use('/auth',adminRouter);
app.listen(5000, () => {
    console.log("Server is running")
})