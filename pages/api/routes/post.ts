import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function postData(taskName: string, isCompleted: boolean) {
    // console.log ("post page")
    try {
        prisma.$connect;
        const data = await prisma.user.create({
            data: {
                username: "",
                email: "",
                password: "",
                tasks: {
                    createMany: {
                        data: [
                            {
                                taskName: taskName,
                                check: isCompleted,
                            }
                        ]
                    }
                }
            }
        })

        console.log(data);
    }
    catch (error) {
        console.log(error);
    }
}