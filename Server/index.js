import express from "express";
import "dotenv/config";
import cors from "cors";
import { connectDB } from "./library/db.js";
import noteRoutes from "./routes/notes.js";
import taskRoutes from "./routes/tasks.js";


const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: '10mb' })); // Increase limit for larger payloads

// app.get("/",(req,res)=>{
//     res.send("hello")
// })


app.use("/api/notes", noteRoutes);
app.use("/api/tasks", taskRoutes);

app.listen(port,async ()=>{
    await connectDB();
    console.log(`Server is running on port http://localhost:${port}`)
});

