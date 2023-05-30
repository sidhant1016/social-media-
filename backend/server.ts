import express from "express";


import "./database";
import * as dotenv from "dotenv";
import path from "path";
import registrationRouter from "./routes/jwtauth";
import loginRouter from "./routes/jwtauth";
import cors from "cors"
dotenv.config({ path: "./config.env" });

const app = express();
const port = 8888;
app.use(cors());
app.use(express.json());
app.use("/auth/register", registrationRouter);
app.use("/auth/login", loginRouter);

app.get("/", (req, res) => {
  res.send("social media");
});

app.listen(port, () => {
  console.log("Server is running on port", port);
});

