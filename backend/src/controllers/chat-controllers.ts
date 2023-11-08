import { Request, Response, NextFunction } from 'express';
import { OpenAIApi, ChatCompletionRequestMessage } from 'openai';
import User from '../models/user.js';
import { configureOpenAI } from '../config/openai-config.js';


export const generateChatCompletion = async (req: Request, res: Response, next: NextFunction) => {
  const { message } = req.body;
  try {
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      return res.status(401).send("User not registered OR Token malfunctioned");
    }
    // get user chats
    const chats = user.chats.map(({role, content}) => ({role, content})) as ChatCompletionRequestMessage[];
    chats.push({role: "user", content: message})
    user.chats.push({role: "user", content: message});
    // send all chats through API to GPT
    const config = configureOpenAI();
    const openai = new OpenAIApi(config);
    // get response
    const chatResponse = await openai.createChatCompletion({model: "gpt-4", messages: chats, });
    user.chats.push(chatResponse.data.choices[0].message);
    await user.save();

    return res.status(200).json({message: "OK", chat: chats });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "ERROR" });
  }
};


export const sendChatsToUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //user token check
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      return res.status(401).send("User not registered OR Token malfunctioned");
    }
    if (user._id.toString() !== res.locals.jwtData.id) {
      return res.status(401).send("Permissions didn't match");
    }
    return res
      .status(200)
      .json({ message: "OK", chats: user.chats });
  } catch (error) {
    console.log(error);
    return res.status(200).json({ message: "ERROR", cause: error.message });
  }
};
export const deleteChats = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //user token check
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      return res.status(401).send("User not registered OR Token malfunctioned");
    }
    if (user._id.toString() !== res.locals.jwtData.id) {
      return res.status(401).send("Permissions didn't match");
    }
    //@ts-ignore
    user.chats = [];
    await user.save();
    return res
      .status(200)
      .json({ message: "OK" });
  } catch (error) {
    console.log(error);
    return res.status(200).json({ message: "ERROR", cause: error.message });
  }
};