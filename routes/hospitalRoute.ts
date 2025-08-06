import { createHospital } from "../controllers/hospitalController";
import express from "express";

const router = express.Router();

router.post("/create", createHospital);

export default router;