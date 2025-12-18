import {requireAuth} from "@clerk/express"
import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";
import User from "../models/User.model.js"
import { ENV } from "../lib/env.js";


export const protectRoute = [
      ClerkExpressRequireAuth({
    // allow requests from your frontend
    authorizedParties: ENV.CLIENT_URL,
  }),
    async (req, res, next) => {
        try {
            const clerkId = req.auth.userId;
            if(!clerkId) return res.status(401).json({message: "Unauthorized - invalid token"})

            const user = await User.findOne({clerkId})
            if(!user) return res.status(401).json({message: "User not found"})
            
            req.user = user

            next()
        } catch (error) {
            console.error("Internal server error", error)
            res.status(500).json({message: "Internal server error!!!"})
        }
    }
]