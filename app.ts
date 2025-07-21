import express from "express";
import cors from "cors";
import { PORT } from "./config/env.ts";
import identifyRouter from "./routes/identify.route.ts";
import errorMiddleware from "./middlewares/error.middleware.ts";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
  cors({
      origin: ["http://localhost:3000"], 
      credentials: true, 
  })
);

app.use('/api/v1/identify', identifyRouter); 

app.use(errorMiddleware);

app.get("/", (req, res) => {
  res.send("Welcome to Bitespeed Backend Task API!!");
});

app.listen(PORT, () => {
  console.log(`Bitespeed API is running on http://localhost:${PORT}`);    
});


export default app