import Agent from "../models/agent";
import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET ;
if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined in environment variables");
}

export const registerAgent = async(req: Request, res: Response) => {
    try{
        const { name, phone, email, password } = req.body;

        const existingAgent = await Agent.findOne({email});
        if (existingAgent) {
            return res.status(400).json({ message: "Agent already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const agent = new Agent({name, phone, email, password: hashedPassword});
        await agent.save();
        res.status(201).json({ message: "Agent registered successfully" });

    }catch(error){
         res.status(500).json({ message: "Registration failed", error });
    }
}


export const loginAgent = async(req: Request, res: Response) => {
    try{
        const {email,password} = req.body;
        const agent = await Agent.findOne({email});
        if(! agent) return res.status(404).json({ message: "Agent not found" });

        const isPasswordValid = await bcrypt.compare(password, agent.password);
        if(!isPasswordValid) return res.status(401).json({ message: "Invalid credentials" });

        const token = jwt.sign({ id: agent._id , name: agent.name}, JWT_SECRET, { expiresIn: '1d' });
        res.status(200).json({token, agent})
    }catch(error){
        res.status(500).json({ message: "Login failed", error });
    }
}