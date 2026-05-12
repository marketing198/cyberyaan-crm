import express from "express";

import mongoose from "mongoose";

import cors from "cors";

import dotenv from "dotenv";

import studentRoutes from "./routes/studentRoutes.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app =
  express();

app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());

// ROUTES
app.use("/api/auth", authRoutes);
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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(
    `Server running on port ${PORT}`
  )
);