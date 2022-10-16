import { Router } from "express";
import { validateToken } from "../middlewares/validateToken.js";
import { urlSchema } from "../schemas/urlSchemas.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { getUrl, shortUrl } from "../Controllers/urlsController.js";

const urlsRouter = Router();

urlsRouter.post(
  "/urls/shorten",
  validateToken,
  validateSchema(urlSchema),
  shortUrl
);

urlsRouter.get("/urls/:id", getUrl);

export default urlsRouter;
