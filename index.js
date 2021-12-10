import https from "https";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

const { PORT } = process.env;

import { app } from "./app.js";

const key = fs.readFileSync("./key.pem");
const cert = fs.readFileSync("./cert.pem");

const server = https.createServer({ key: key, cert: cert }, app);

server.listen(PORT || 3000, () => {
  console.log("Server is running");
});
