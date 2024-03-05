import { useEffect, useState } from "react";
import HomePage from "../components/homepage";
import axios from "axios";

export default function Home() {

  useEffect (()=>{
    async function fetchData() {
        try {
          axios.post ('http://localhost:3000/api/', {
            taskName: "newTask",
            check: "false",
          })
        } 
        catch (error) {
          console.log (error);
        }
    }
    fetchData();
  },[])

  return (
    <>
      <HomePage/>
    </>
  );
}
