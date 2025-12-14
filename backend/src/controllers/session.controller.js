import Session from "../models/Session.model.js";
import { chatClient, streamClient } from "../lib/stream.js";

export async function createSession(req, res){
    try {
        const {problemTitle, difficulty} = req.body;
        const userId = req.user._id;
        const clerkId = req.user.clerkId;

        if(!problemTitle || !difficulty){return res.status(400).json({message: "Please provide all the required data!!!"})}

        const callId = `session_${Date.now()}_${Math.random().toString(36).substring(7)}`

        const session = await Session.create({problemTitle, difficulty, host: userId, callId})

        await streamClient.video.call("default", callId).getOrCreate({
            data:{
                created_by: clerkId,
                custom: {
                    problemTitle,
                    difficulty,
                    sessionId: session._id.toString()
                }
            }
        });

        const channel = chatClient.channel("messaging", callId, {
            name: `${problemTitle} Session`,
            created_by: clerkId,
            members: [clerkId]
        })

        await channel.create()

        res.status(201).json({session})
    } catch (error) {
        console.log("Error in creating session", error)
        res.status(500).json({message: "Internal server error!!!"})
    }
}


export async function getActiveSession(_, res){
    try {
        const sessions = await Session.find({status: "active"})
        .populate("host", "name profileImage email clerkId")
        .sort({createdAt: -1})
        .limit(10);

        res.status(200).json({sessions})
    } catch (error) {
        console.log("Error in finding active sessions", error)
        res.status(500).json({message: "Internal server error!!!"})
    }
}


export async function getMyRecentSession(req, res){
    try {
        const userId = req.user._id;

        const sessions = await Session.find({
            status: "completed",
            $or: [{host: userId}, {participant: userId}]
        }).sort({createdAt: -1}).limit(10);

        res.status(200).json({sessions})
    } catch (error) {
        console.log("Error in finding user recent sessions", error)
        res.status(500).json({message: "Internal server error!!!"})
    }
}


export async function getSessionById(req, res){
    try {
        const {id} = req.params;

        const session  = await Session.findById(id).populate("host", "name profileImage email clerkId").populate("participant", "name profileImage email clerkId")


        if(!session) return res.status(404).json({message: "Session not found"})

        res.status(200).json({session})
    } catch (error) {
        console.log("Error in finding the session", error)
        res.status(500).json({message: "Internal server error!!!"})
    }
}


export async function joinSession(req, res){
    try {
        const {id} = req.params
        const userId = req.user._id
        const clerkId = req.user.clerkId

        const session = await Session.findById(id);

        if(!session) return res.status(404).json({message: "Session not found"})

        if(session.participant) return res.status(404).json({message: "Session is full"})

        session.participant = userId;

        await session.save();

        const channel = chatClient.channel("messaging", session.callId)
        await channel.addMembers([clerkId])

        res.status(200).json({session})
    } catch (error) {
        console.log("Error in joining the session", error)
        res.status(500).json({message: "Internal server error!!!"})
    }
}


export async function endSessionBy(req, res){
    try {
        const {id} = req.params
        const userId = req.user._id
        
        const session = await Session.findById(id);

        if(!session) return res.status(404).json({message: "Session not found"})

        if(session.host.toString() !== userId.toString()){
            return res.status(403).json({message: "Session can only be end by host"})
        }

        if(session.status === "completed"){
            return res.status(400).json({message: "Session is already completed"})
        }

        session.status = "completed"
        await session.save()

        const call = streamClient.video.call("default", session.callId)
        await call.delete({hard: true})

        const channel = chatClient.channel("messaging", session.callId)
        await channel.delete();

        return res.status(200).json({session, message: "Session ended successfully"})
    } catch (error) {
        console.log("Error ending the session", error)
        res.status(500).json({message: "Internal server error!!!"})
    }
}