import { Router } from "express";
import { SeedController } from "./seed.controller";

const router = Router();
const seedController = new SeedController();

router.get("/", seedController.executeSeed.bind(seedController));

export default router;
