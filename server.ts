import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db";
import authRoutes from "./routes/authRoute";
import hospitalRoutes from "./routes/hospitalRoute";
import sampleRoutes from "./routes/sampleRoute";


dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/api/auth", authRoutes);
app.use("/api/hospital", hospitalRoutes);
app.use("/api/sample", sampleRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
