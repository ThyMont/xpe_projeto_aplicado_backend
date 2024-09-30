import express from "express";
import { register } from "../resources/register.resource.js";

const router = express.Router();
router.post("/", register);

export default router;
