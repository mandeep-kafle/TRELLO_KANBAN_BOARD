import React, { useEffect, useState } from "react";
import { useQuery,useSubscription } from "@apollo/client";
import { GET_TASKS } from "../Graphql/Queries";
import {TASK_TYPE1,TASK_TYPE2,TASK_TYPE3} from "../config"
import TaskAddModal from "./TaskAddModal";
import List from "./List";
import "./Body.css"
import Todo_PNG from "../assets/Todo.png";
import Completed_PNG from "../assets/Completed.png";
import Inprogress_PNG from "../assets/Inprogress.png";

const Body = () => {
  const { error, loading, data } = useQuery(GET_TASKS);
  const [tasks, setTasks] = useState([]);

 
  useEffect(() => {
    if (data) {
      setTasks(data.TASKS);
     
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
     
      <div className="list__title__wrapper">
      <div class="header__icon--active">
         <img src={Todo_PNG}   width="60" 
           height="60" />
        </div>
        <h2>TODO</h2>
        <div className="icon__wrapper">
        <TaskAddModal taskType={TASK_TYPE1}/>
        </div>
        
        </div>
        <List tasks={todoTasks}/>
      </div>

      <div className="list__wrapper"> 
      <div className="list__title__wrapper">
      <div class="header__icon--active">
         <img src={Inprogress_PNG}   width="60" 
           height="60" />
        </div>
        <h2>INPROGRESS</h2>
        <div className="icon__wrapper">
        <TaskAddModal taskType={TASK_TYPE2}/>
        </div>
        </div>
        <List tasks={inprogressTasks}/>
        </div>

        <div className="list__wrapper">
        <div className="list__title__wrapper">
        <div class="header__icon--active">
         <img src={Completed_PNG}   width="60" 
           height="60" />
        </div>
          <h2>COMPLETED</h2>
          <div className="icon__wrapper">
        <TaskAddModal taskType={TASK_TYPE3}/>
        </div>
        </div>
        <List tasks={completedTasks}/>
        </div>
    </div>
  );
};

export default Body;
