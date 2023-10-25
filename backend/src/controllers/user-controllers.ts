import { NextFunction, Request, Response } from "express";
import User from "../models/user.js";
import { hash, compare } from "bcrypt";

export const getAllUsers = async (
    req: Request,
    res: Response,
    next: NextFunction
    ) => {
    try {
      //get all users
      const users = await User.find();
      return res.status(200).json({ message: "FETCHING ALL USERS", users });
    } catch (error) {
      console.log(error);
      return res.status(200).json({ message: "ERROR FETCHING ALL USERS", cause: error.message });
    }
  };

export const userSignup = async (
    req: Request,
    res: Response,
    next: NextFunction
    ) => {
    try {
        //user signup
        const { name, email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(401).json({ message: "USER ALREADY EXISTS" });
        };
        const hashedPassword = await hash(password, 10);
        const user = new User({ name, email, password: hashedPassword });
        await user.save();
        //return user id
        return res.status(201).json({ message: "USER SIGNUP", id: user._id.toString() });
    } catch (error) {
        console.log(error);
        return res.status(200).json({ message: "ERROR SIGNUP", cause: error.message });
    }
};

export const userLogin = async (
    req: Request,
    res: Response,
    next: NextFunction
    ) => {
    try {
        //user login
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        console.log(user);
        if (!user) {
            return res.status(401).json({ message: "USER DOES NOT EXIST" });
        };
        const isPasswordValid = await compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(403).json({ message: "INVALID CREDENTIALS" });
        };

        //return user id
        return res.status(200).json({ message: "USER LOGIN", id: user._id.toString() });
    } catch (error) {
        console.log(error);
        return res.status(200).json({ message: "ERROR SIGNUP", cause: error.message });
    }
};