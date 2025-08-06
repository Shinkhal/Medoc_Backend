import { registerAgent, loginAgent } from "../controllers/authController";

import express from "express";

const router = express.Router();

// Register route
router.post("/register", registerAgent);
// Login route
router.post("/login", loginAgent);

export default router;