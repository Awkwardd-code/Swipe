import express from "express";
import { protectRoute } from "../middlewares/auth.js";
import { getMessages, getUserProfiles, swipeLeft, swipeRight } from "../controllers/matchController.js";

const router = express.Router();

router.post("/swipe-right/:likedUserId",protectRoute,swipeRight);
router.post("/swipe-left/:dislikedUserId",protectRoute,swipeLeft);


router.get("/",protectRoute,getMessages);
router.get("/user-profiles",protectRoute,getUserProfiles)
export default router;