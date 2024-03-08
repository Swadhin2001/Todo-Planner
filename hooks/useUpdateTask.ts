import axios from "axios";

async function useUpdateTask(id:string, updatedTask:string, isCompleted: boolean){
    try {
        const data = {
            updatedTask: updatedTask,
            isCompleted: isCompleted,
        }
        await axios.put (`http://localhost:3000/api/routes/${id}`, data);
    } 
    catch (error) {
        console.log (error);    
    }
}

export default useUpdateTask;