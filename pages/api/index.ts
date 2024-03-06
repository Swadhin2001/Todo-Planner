import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient, Task } from "@prisma/client";
import { postData } from "@/pages/api/routes/post";


const prisma = new PrismaClient()


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Task[]>,
) {
  if (req.method === 'POST'){
    try{
      const {taskName, isCompleted} = req.body
      postData (taskName, isCompleted);
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
  if (req.method === 'DELETE'){
    try {
      await prisma.task.deleteMany();
    }   
    catch (error) {
      console.log ("All Delete Error: ", error);  
    }
  }
}


export {} 