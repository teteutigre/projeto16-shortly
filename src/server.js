import express from "express";
import cors from "cors";
import router from "./routers/router.js";
import dotenv from "dotenv";

dotenv.config();

const server = express();
server.use(cors());
server.use(express.json());

server.use(router);

server.listen(process.env.PORT || 4000, () => {
  console.log("Server running on port " + process.env.PORT);
});
