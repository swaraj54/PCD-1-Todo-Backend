import express from "express";
import mongoose from "mongoose";
import allRoutes from "./routes/index.js";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Working.");
});

app.use("/api/v1", allRoutes);

mongoose
  .connect(
    "mongodb+srv://myaccount:AO6GljLjvmKvVRzj@cluster0.6yd9l.mongodb.net/todo"
  )
  .then(() => {
    console.log("Connected to MongoDB.");
  });

app.listen(3001, () => {
  console.log("Server listening on port 3001");
});
