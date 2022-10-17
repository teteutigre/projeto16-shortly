import { Router } from "express";
import { validateToken } from "../middlewares/validateToken.js";
import { urlSchema } from "../schemas/urlSchemas.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import {
  deleteUrl,
  getUrl,
  redirectUrl,
  shortUrl,
} from "../Controllers/urlsController.js";

const urlsRouter = Router();

urlsRouter.post(
  "/urls/shorten",
  validateToken,
  validateSchema(urlSchema),
  shortUrl
);

urlsRouter.get("/urls/:id", getUrl);

urlsRouter.get("/urls/open/:shortUrl", redirectUrl);

urlsRouter.delete("/urls/:id", validateToken, deleteUrl);

export default urlsRouter;
