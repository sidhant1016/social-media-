import express from "express";
import "./database";
import * as dotenv from "dotenv";
import path from "path";
import cors from "cors";
import registerRouter from "./routes/jwtauth";
import loginRouter from "./routes/jwtauth"

dotenv.config({ path: "./config.env" });

const app = express();
const port = 5001;

app.use(cors());
app.use(express.json());
app.use("/auth", registerRouter);
app.use("/auth",loginRouter)

app.get("/", (req, res) => {
  res.send("social media");
});

app.listen(port, () => {
  console.log("Server is running on port", port);
});
