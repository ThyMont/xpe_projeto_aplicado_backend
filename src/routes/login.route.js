import express from "express";
import { login } from "../resources/login.resource.js";

const router = express.Router();
router.post("/", login);

export default router;
