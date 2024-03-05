import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient, Task } from "@prisma/client";


const prisma = new PrismaClient()


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Task[]>,
) {
  if (req.method === 'POST'){
    try{
      const {taskName, isCompleted} = req.body
      prisma.$connect;
  
      const data = await prisma.task.create({
        data:{          
          taskName: taskName,
          check: isCompleted,
        }
      })

      console.log (data);
    }
    catch(e){
      console.log ("Prisma error : ", e);
    }
  }
  if (req.method === 'GET'){
    try{
      const data:Task[] = await prisma.task.findMany();
      res.status(200).json(data);
    }
    catch (e){
      console.log (e);
    }
  }
}


export {} 