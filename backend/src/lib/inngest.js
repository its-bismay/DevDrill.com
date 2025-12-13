import {Inngest} from "inngest"
import User from "../models/User.model.js"
import { connectDB } from "./db.js"

export const inngest = new Inngest({id: "DevDrill"})

const syncUser = inngest.createFunction(
    {id: "sync-user"},
    {event: "clerk/user.created"},
    async({event}) => {
        await connectDB()

        const {id, email_addresses, first_name, last_name, image_url} = event.data

        const newUser ={
            clerkId: id,
            email: email_addresses[0]?.email_address,
            name: `${first_name || ""} ${last_name || ""}`,
            profileImage: image_url
        }

        await User.create(newUser)
    }
)


const deleteUserFromDb = inngest.createFunction(
    {id: "delete-user-from-database"},
    {event: "clerk/user.deleted"},
    async({event}) => {

        await connectDB()

        const {id} = event.data

        await User.deleteOne({clerkId: id})
    }
)

export const functions = [syncUser, deleteUserFromDb]