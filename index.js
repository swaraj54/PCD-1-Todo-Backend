import express from "express";
import mongoose from "mongoose";
import allRoutes from "./routes/index.js";
import cors from "cors";
import dotenv from "dotenv";

const app = express();
app.use(express.json());
app.use(cors());
dotenv.config();

app.get("/", (req, res) => {
  res.send("Working.");
});

app.use("/api/v1", allRoutes);

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("Connected to MongoDB.");
  });

app.listen(3001, () => {
  console.log("Server listening on port 3001");
});
