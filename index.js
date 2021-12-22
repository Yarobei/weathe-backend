import https from "https";
import fs from "fs";
import config from "config";

import { app } from "./app.js";

const port = config.get("server.port");

const key = fs.readFileSync("./key.pem");
const cert = fs.readFileSync("./cert.pem");

const server = https.createServer({ key: key, cert: cert }, app);

server.listen(port || 3000, () => {
  console.log("Server is running on port: ", port);
});
