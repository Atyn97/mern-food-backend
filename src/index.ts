import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import myUserRoute from "./routes/MyUserRoute";
import myRestaurantRoute from "./routes/MyRestaurantRoute";
import restaurantRoute from "./routes/RestaurantRoute";
import { v2 as cloudinary } from "cloudinary";
import orderRoute from "./routes/OrderRoute";

// connection to MongoDB database
mongoose
  .connect(process.env.MONGODB_CONNECTION_STRING as string)
  .then(() => console.log("Connected to database!"));

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express();
app.use(cors());

// validation and security reasons
app.use("/api/order/checkout/webhook", express.raw({ type: "*/*" }));

app.use(express.json()); // middleware: automatically convert body of any request to API server to json

app.get("/health", async (req: Request, res: Response) => {
  res.send({ message: "health OK!" });
});

// entree point to the server
app.use("/api/my/user", myUserRoute);
app.use("/api/my/restaurant", myRestaurantRoute);
app.use("/api/restaurant", restaurantRoute);
app.use("/api/order", orderRoute);

// connection to localhost
app.listen(7000, () => {
  console.log("Server started on localhost:7000");
});
