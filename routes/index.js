import { Router } from "express";
import todoRoutes from "./todoRoutes.js";

const router = Router();

router.use("/todo", todoRoutes);

export default router;
