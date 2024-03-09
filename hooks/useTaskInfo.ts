import { Task } from '@/types';
import axios from 'axios';
import {useState, useEffect} from 'react'


function useTaskInfo (url:string) {
    const [task, setTask] = useState<Task[]> ([]);
    
    useEffect (()=>{
        async function fetchReq (){
            try {
                const tasks = await axios.get(`${url}`);
                const data = tasks.data;
                const newData:Task[] = []; 
                data.forEach((element:any) => {
                    newData.push({
                        id: element.id,
                        taskName: element.taskName,
                        check: false,
                        editCheck: false,
                        isCompleted: element.check,
                    })
                });
                setTask (newData);
            } 
            catch (error) {
                console.log (error);
            }
        }
        fetchReq();
    },[url])
    return task;
}

export default useTaskInfo;