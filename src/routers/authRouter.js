import express from "express";
import { signIn, signUp } from "../Controllers/authController.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { signUpSchema, signInSchema } from "../schemas/authSchemas.js";
import { validateToken } from "../middlewares/validateToken.js";

const usersRouter = express.Router();

usersRouter.post("/signup", validateSchema(signUpSchema), signUp);
usersRouter.post("/signin", validateSchema(signInSchema), signIn);

export default usersRouter;
