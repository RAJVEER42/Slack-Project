import { Inngest } from "inngest";
import { connectDB } from "../config/db.js";
import User from "../models/user.model.js";
import { deleteStreamUser, upsertStreamUser } from "./stream.js";


// Create a client to send and receive events
export const inngest = new Inngest({ id: "slack-101" });


// take the user from clerk and save it to our database
const syncUser = inngest.createFunction(
    {id: "sync-user"},
    {event: "clerk/user.created"},
    async ({ event }) => {
        await connectDB();
        
        // clerk: creating a user from clerk into inngest, with the given info

        const { id, email_addresses, firstName, lastName, image_url } = event.data; // Destructure necessary fields from the event data, means we are getting data from clerk webhook

        const newUser = {
            email: email_addresses[0].email_address,
            name: `${firstName} ${lastName}`,
            image: image_url,
            clerkId: id,
        }; // Construct new user object, ready to be saved

        await User.create(newUser); // Save the new user to our database

        // stream: creating a user from stream into inngest, with the given info

        await upsertStreamUser({
            id: newUser.clerkId.toString(),
            name: newUser.name,
            image: newUser.image,
        })

    }
);

const deleteUserFromDB = inngest.createFunction(
    {id: "delete-user-from-db"}, // Unique identifier for this function
    {event: "clerk/user.deleted"}, // Listen for the 'clerk/user.deleted' event from Clerk
    async ({ event }) => {
        await connectDB();

        // Clerk (deleting the user from the database)

        const { id } = event.data; // Get the clerk user ID from the event data
        await User.deleteOne({ clerkId: id }); // Delete the user from our database with matching clerkId
    
        // Stream (you want delete the user, then delete it from database as well as stream)

        await deleteStreamUser(id.toString());

    }
);


// Create an empty array where we'll export future Inngest functions
export const functions = [syncUser, deleteUserFromDB];