import React, { useEffect, useState } from "react";
import { useQuery,useSubscription } from "@apollo/client";
import { GET_TASKS } from "../Graphql/Queries";


import Form from "./Form";
const Body = () => {
  const { error, loading, data } = useQuery(GET_TASKS);
  const [tasks, setTasks] = useState([]);
  const [count,setCount]=useState(1);

 
  useEffect(() => {
   
    if (data) {
      setTasks(data.TASKS);
      console.log(tasks);
    }
    
  }, [data, tasks]);

  return (
    <div>
      <Form/>
      {tasks.map((val) => {
        return <h1>{val.taskname}</h1>;
      })}
      <div>{count}</div>
      
    </div>
  );
};

export default Body;
