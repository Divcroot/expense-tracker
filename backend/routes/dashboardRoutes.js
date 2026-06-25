import { Router } from "express";
import { protect } from "../middlewares/authMiddleware.js";
import { getDashboardData } from "../controllers/dashboardController.js";

export const dashboardRouter = Router()

dashboardRouter.get('/', protect, getDashboardData)