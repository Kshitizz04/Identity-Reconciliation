import express from "express";
import { PORT } from "./config/env.ts";
import identifyRouter from "./routes/identify.route.ts";

const app = express();

app.use('/api/v1/identify', identifyRouter); 

app.get("/", (req, res) => {
  res.send("Welcome to Bitespeed Backend Task API!!");
});

app.listen(PORT, () => {
  console.log(`Bitespeed API is running on http://localhost:${PORT}`);    
});


export default app