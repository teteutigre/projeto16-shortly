import { Router } from "express";
import { getMe } from "../Controllers/userController.js";
import { validateToken } from "../middlewares/validateToken.js";

const getUserRouter = Router();

getUserRouter.get("/users/me", validateToken, getMe);

export default getUserRouter;
