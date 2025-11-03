import { StreamChat } from "stream-chat";
import { ENV } from "../config/env.js";

// It creates a secure Stream Chat client for your backend to manage chats and users.
const streamClient = StreamChat.getInstance(ENV.STREAM_API_KEY, ENV.STREAM_API_SECRET)  

// function to save a user to the stream 
export const upsertStreamUser = async (userData) => {
    try {
        await streamClient.upsertUser(userData); // saving user
        console.log("Stream user upserted successfully:", userData.name); // logging successful meessage
        return userData;
    } catch (error) {
        console.log("Error upserting Stream user:", error);
    };
};

// function to delete a user from stream 
export const deleteStreamUser = async (userId) => {
    try {
        await streamClient.deleteUser(userId); // deleting an user with given id
        console.log("Stream user deleted successfully:", userId); // logging successful meessage
    } catch (error) {
        console.log("Error upserting Stream user:", error);
    };
};

// auth for stream (generate tokens) which is different from that of the clerk
export const generateStreamToken = (userId) => {
    try{
        const userIdString = userId.toString();
        return streamClient.createToken(userIdString);
    } catch (error) {
        console.log("Error generating Stream token:", error);
        return null;
    }
};
