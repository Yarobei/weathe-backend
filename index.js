import https from "https";
import fs from "fs";
import dotenv from "dotenv";
import { app } from "./app.js";

dotenv.config();

const { PORT } = process.env;

const key = fs.readFileSync("./key.pem");
const cert = fs.readFileSync("./cert.pem");

const server = https.createServer({ key: key, cert: cert }, app);

server.listen(PORT || 3000, () => {
  console.log("Server is running");
});
