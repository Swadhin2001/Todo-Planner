import { postedTask } from "@/types";
import axios from "axios";

async function usePostTask (task: postedTask){
    try {
        await axios.post('http://localhost:3000/api/', task)
    } 
    catch (error) {
        console.log (error);    
    }
}

export default usePostTask