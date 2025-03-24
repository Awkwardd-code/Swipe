import express from "express"
import { checkAuthentication, login, logout, signup } from "../controllers/authController.js";
import { protectRoute } from "../middlewares/auth.js";

const router = express.Router();

router.post("/signup",signup);

router.post("/login", login);
router.post("/logout", logout);

router.get("/me", protectRoute, checkAuthentication);


export default router;