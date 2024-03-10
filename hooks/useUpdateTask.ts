import axios from "axios";

async function useUpdateTask(id:string, updatedTask:string, isCompleted: boolean){
    try {
        const data = {
            updatedTask: updatedTask,
            isCompleted: isCompleted,
        }
        await axios.put (`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/routes/${id}`, data);
    } 
    catch (error) {
        console.log (error);    
    }
}

export default useUpdateTask;