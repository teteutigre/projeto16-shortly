import express from "express";
import usersRouter from "./authRouter.js";
import urlsRouter from "./urlsRouter.js";
import getUserRouter from "./userRouter.js";

const router = express.Router();

router.use(usersRouter);
router.use(urlsRouter);
router.use(getUserRouter);

export default router;
