import React, { useEffect, useState } from "react";
import { useQuery,useSubscription } from "@apollo/client";
import { GET_TASKS } from "../Graphql/Queries";
import {TASK_TYPE1,TASK_TYPE2,TASK_TYPE3} from "../config"
import TaskAddModal from "./TaskAddModal";
import List from "./List"
import "./Body.css"

const Body = () => {
  const { error, loading, data } = useQuery(GET_TASKS);
  const [tasks, setTasks] = useState([]);

 
  useEffect(() => {
    if (data) {
      setTasks(data.TASKS);
      console.log(tasks);
    }
    
  }, [data, tasks]);

  let todoTasks=[];
  let inprogressTasks=[];
  let completedTasks=[];

  for(let i=0;i<tasks.length;i++)
  {
    if(tasks[i]['tasktype']===TASK_TYPE1)
    todoTasks.push(tasks[i]);
    if(tasks[i]['tasktype']===TASK_TYPE2)
    inprogressTasks.push(tasks[i]);
    if(tasks[i]['tasktype']===TASK_TYPE3)
    completedTasks.push(tasks[i]);

  }


  return (
    <div className="body__wrapper">
      <div className="list__wrapper">
     
      <div className="list__title__wrapper">TODO'S
        <TaskAddModal taskType={TASK_TYPE1}/>
        </div>
        <List tasks={todoTasks}/>
      </div>

      <div className="list__wrapper"> 
      <div className="list__title__wrapper">INPROGRESS
        <TaskAddModal taskType={TASK_TYPE2}/>
        </div>
        <List tasks={inprogressTasks}/>
        </div>

        <div className="list__wrapper">
        <div className="list__title__wrapper">DONE
        <TaskAddModal taskType={TASK_TYPE3} />
        </div>
        <List tasks={completedTasks}/>
        </div>
    </div>
  );
};

export default Body;
