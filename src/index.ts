import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import myUserRouter from "./routes/MyUserRoute";

// connection to MongoDB database
mongoose
  .connect(process.env.MONGODB_CONNECTION_STRING as string)
  .then(() => console.log("Connected to database!"));

const app = express();
app.use(express.json()); // middleware: automatically convert body of any request to API server to json
app.use(cors());

app.get("/health", async (req: Request, res: Response) => {
  res.send({ message: "health OK!" });
});

// entree point to the server
app.use("/api/my/user", myUserRouter);

// connection to localhost
app.listen(7000, () => {
  console.log("Server started on localhost:7000");
});
