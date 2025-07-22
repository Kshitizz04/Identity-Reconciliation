import express from "express";
import cors from "cors";
import { PORT } from "./config/env.js";
import identifyRouter from "./routes/identify.route.js";
import errorMiddleware from "./middlewares/error.middleware.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
  cors({
      origin: ["http://localhost:3000"], 
      credentials: true, 
  })
);

app.use('/api/v1/identifyCustomer', identifyRouter); 

app.use(errorMiddleware);

app.get("/", (req, res) => {
  res.send("Welcome to Bitespeed Backend Task API!!");
});

app.listen(PORT, () => {
  console.log(`Bitespeed API is running on Port:${PORT}`);
});


export default app