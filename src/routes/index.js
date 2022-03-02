import { Router } from "express";
import * as usersSchema from "../schemas/usersSchema.js";
import * as usersController from "../controllers/usersController.js";
import * as sessionsController from "../controllers/sessionsController.js";
import * as categoriesController from "../controllers/categoriesController.js";
import validateToken from "../middlewares/tokenValidator.js";

const router = Router();

router.post("/sign-up", usersSchema.validateNewUser, usersController.insert);
router.post("/log-in", usersSchema.validateUser, sessionsController.insert);
router.use(validateToken);
router.post("/categories", categoriesController.insert);

export default router;
