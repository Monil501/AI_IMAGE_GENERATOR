import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import PostRouter from "./routes/Posts.js";
import GenerateImageRouter from "./routes/GenerateImage.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));

app.use("/api/post", PostRouter);
app.use("/api/generateImage", GenerateImageRouter);

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
      app.listen(5000, () => console.log("Server started on port 5000"));
  })
  .catch((err) => console.error(err));