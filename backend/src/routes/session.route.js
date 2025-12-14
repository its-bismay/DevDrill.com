import express from "express"
import { protectRoute } from "../middlewares/protectRoute.js";
import { createSession, endSessionBy, getActiveSession, getMyRecentSession, getSessionById, joinSession } from "../controllers/session.controller.js";


const router = express.Router()

router.post("/",protectRoute, createSession)
router.get("/active",protectRoute, getActiveSession)
router.get("/my-recent",protectRoute, getMyRecentSession)

router.get("/:id",protectRoute, getSessionById)
router.post("/:id/join",protectRoute, joinSession)
router.post("/:id/end",protectRoute, endSessionBy)

export default router;