import { Router } from "express";
import { createProperty, getAllProperties } from "../controllers/property.controller.js";
import authorize from "../../middlewares/auth.middleware.js";

const propertyRouter = Router();

propertyRouter.post('/', authorize, createProperty);

propertyRouter.get('/', getAllProperties);

export default propertyRouter;