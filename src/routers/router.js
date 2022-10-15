import express from "express";
import usersRouter from "./authRouter.js";

const router = express.Router();

router.use(usersRouter);

export default router;
