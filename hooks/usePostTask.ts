import { postedTask } from "@/types";
import axios from "axios";

async function usePostTask (task: postedTask){
    try {
        await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/`, task)
    } 
    catch (error) {
        console.log (error);    
    }
}

export default usePostTask