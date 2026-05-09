import express from "express";

import mongoose from "mongoose";

import cors from "cors";

import dotenv from "dotenv";

import studentRoutes from "./routes/studentRoutes.js";

dotenv.config();

const app =
  express();

app.use(cors());

app.use(express.json());

// ROUTES
app.use(
  "/api/students",
  studentRoutes
);

// DB CONNECT
mongoose
  .connect(
    process.env.MONGO_URI
  )
  .then(() =>
    console.log(
      "MongoDB Connected"
    )
  )
  .catch((err) =>
    console.log(err)
  );

app.listen(5000, () =>
  console.log(
    "Server running on port 5000"
  )
);