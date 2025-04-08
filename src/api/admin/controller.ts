import { Request,Response } from "express";
import prisma from '../../prisma.js';
import { Attendance } from "./types.js";
const putAttendance = async (req:Request,res:Response) : Promise<void>=>{
    try{
        const attendance : Attendance = req.body;
        if (!attendance.event_id || !attendance.user_id || attendance.is_present === undefined) {
            res.status(400).json({
                message: "Required fields missing: event_id, user_id, and is_present are required"
            });
            return;
        }
        const updatedAttendance = await prisma.teammembers.updateMany({
            where:{
                event_id: attendance.event_id,
                user_id: attendance.user_id
            },
            data:{
                is_present: attendance.is_present
            }
        })

        if (updatedAttendance.count==0){
            res.status(404).json({
                message : "No record found for matching event_id and user_id"
            });
            return;
        }
        res.status(200).json({
            message: "Attendance updated successfully for the given user_id and event_id"
        })
    }catch(error){
        res.status(500).json({
            message : "Internal server error while updating attendance",
            error : error
        });
    }
}

export default putAttendance;