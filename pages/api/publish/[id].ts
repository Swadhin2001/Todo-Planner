import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handle(req:NextApiRequest, res: NextApiResponse) {
    const reqId = req.query.id;
    const {updatedTask, isCompleted} = req.body
    if (req.method === 'PUT'){
        try {
            const post = await prisma.task.update ({        
                where: {
                    id:reqId,
                },
                data:{
                    taskName: updatedTask,
                    check: isCompleted
                }
            })
            return res.json (post);            
        } 
        catch (error) {
            console.log ("Put api error: ",error);    
        }
    }
    
    if (req.method === "DELETE"){
        try {
            await prisma.task.delete({
                where:{
                    id : reqId,
                }
            })
        }   
        catch (error) {
            console.log ("Delete Api error: ", error);
        }
    }

}

export {}