import express, { Response } from "express";
import { register, login } from "../controllers/authController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { IAuthRequest } from "../types/express";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

router.get("/me", authMiddleware, (req: IAuthRequest, res: Response) => {
  res.json({
    message: "Rota protegida acessada com sucesso!",
    user: req.user,
  });
});

export default router;
