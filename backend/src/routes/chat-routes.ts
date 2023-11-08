import { Router } from "express";
import { verifyToken } from "../utils/token-manager.js";
import { chatValidator, validate } from "../utils/validators.js";
import { generateChatCompletion, sendChatsToUser, deleteChats } from "../controllers/chat-controllers.js";

const chatRouter = Router();

//Protected API
chatRouter.post("/new", validate(chatValidator), verifyToken, generateChatCompletion)

//TODO: rename this
chatRouter.get("/all-chats", verifyToken, sendChatsToUser)

chatRouter.delete("/delete", verifyToken, deleteChats)

export default chatRouter;