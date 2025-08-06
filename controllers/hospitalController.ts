import { Request, Response } from "express";
import Hospital from "../models/hospital";

export const createHospital = async (req: Request, res: Response) => {
    try{

        const {name, address} = req.body;
        if (!name || !address) {
            return res.status(400).json({ message: "Name and address are required" });
        }
        const newHospital = new Hospital({
            name,
            address
        });
        await newHospital.save();
        res.status(201).json({ message: "Hospital created successfully", hospital: newHospital });

    }catch (error) {
        res.status(500).json({ message: "Error creating hospital", error });
    }

}

