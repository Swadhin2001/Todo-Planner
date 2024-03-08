import {useState, useEffect} from 'react'


// Some error is occuring need debugging
async function useTaskInfo () {
    const [apiData, setApiData] = useState ({});
    useEffect (()=>{
        fetch ('http://localhost:3000/api')
        .then ((res)=> res.json())
        .then ((res)=> setApiData(res))
    },[])
    return apiData;
}

export default useTaskInfo;