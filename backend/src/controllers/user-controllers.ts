import { NextFunction, Request, Response } from "express";
import User from "../models/user.js";
import { createToken } from "../utils/token-manager.js";
import { hash, compare } from "bcrypt";
import { COOKIE_NAME } from "../utils/constants.js";

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
        //stored user in db

        //create jwt token and set cookie
        const token = createToken(user._id.toString(), user.email, "7d");

        const expires = new Date();
        expires.setDate(expires.getDate() + 7);
        res.clearCookie(COOKIE_NAME ,{
            path: "/",
            domain: "localhost",
            expires,
            httpOnly: true,
            signed: true,
        });

        res.cookie(COOKIE_NAME, token, { path: "/", domain: "localhost", expires, httpOnly: true, signed: true });

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
        //user credentials validated

        //create jwt token and set cookie
        const token = createToken(user._id.toString(), user.email, "7d");

        //#TODO: change COOKIE_NAME to something more meaningful
        const expires = new Date();
        expires.setDate(expires.getDate() + 7);
        res.clearCookie(COOKIE_NAME ,{
            path: "/",
            domain: "localhost",
            expires,
            httpOnly: true,
            signed: true,
        });

        res.cookie(COOKIE_NAME, token, { path: "/", domain: "localhost", expires, httpOnly: true, signed: true });
        //return user id
        return res.status(200).json({ message: "USER LOGIN", id: user._id.toString() });
    } catch (error) {
        console.log(error);
        return res.status(200).json({ message: "ERROR SIGNUP", cause: error.message });
    }
};