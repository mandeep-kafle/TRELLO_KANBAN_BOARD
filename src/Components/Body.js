import React, { useEffect, useState } from "react";
import { useQuery} from "@apollo/client";
import { GET_TASKS } from "../Graphql/Queries";
import {TASK_TYPE1,TASK_TYPE2,TASK_TYPE3,TASK_TYPE1_TEXT,TASK_TYPE2_TEXT,TASK_TYPE3_TEXT} from "../config"
import TaskAddModal from "./TaskAddModal";
import List from "./List";
import "../Styles/Body.css";
import Todo_PNG from "../assets/Todo.png";
import Completed_PNG from "../assets/Completed.png";
import Inprogress_PNG from "../assets/Inprogress.png";
import {DragDropContext} from "react-beautiful-dnd";
import { useMutation } from "@apollo/client";
import {UPDATE_TASK_TYPE} from "../Graphql/Mutations";


const Body = () => {
  const { error, loading, data } = useQuery(GET_TASKS);
  const [tasks, setTasks] = useState([]);

 
  useEffect(() => {
    if (data) {
      setTasks(data.TASKS);
     }
    
  }, [data, tasks]);

  let todoTasks=[],inprogressTasks=[],completedTasks=[];
  for(let i=0;i<tasks.length;i++)
  {
    if(tasks[i]['tasktype']===TASK_TYPE1)
    todoTasks.push(tasks[i]);
    if(tasks[i]['tasktype']===TASK_TYPE2)
    inprogressTasks.push(tasks[i]);
    if(tasks[i]['tasktype']===TASK_TYPE3)
    completedTasks.push(tasks[i]);

  }
  const [updateTaskType ,{err}]=useMutation(UPDATE_TASK_TYPE);
  let onDragEnd=(result)=>{
     const {destination ,source,droppableId}=result;
    if(!destination){
      return;
    }
    if(destination.droppableId===source.droppableId){
         return;
       }
       let idToUpdate="";
       let currenttaskdata;
       if(source.droppableId===TASK_TYPE1)
       {  currenttaskdata=todoTasks[source.index];
          idToUpdate=todoTasks[source.index]['id'];
          todoTasks[source.index]['tasktype']=destination.droppableId;
          todoTasks.splice(source.index);
        }
       if(source.droppableId===TASK_TYPE2)
       {  
        currenttaskdata=inprogressTasks[source.index];
        idToUpdate=inprogressTasks[source.index]['id'];
        inprogressTasks[source.index]['tasktype']=destination.droppableId;
        inprogressTasks.splice(source.index);
       }
       if(source.droppableId===TASK_TYPE3)
       {
        currenttaskdata=completedTasks[source.index]['id'];
        idToUpdate=completedTasks[source.index]['id'];
        completedTasks[source.index]['tasktype']=destination.droppableId;
        completedTasks.splice(source.index);
       }

      
       todoTasks.push(...completedTasks);
       todoTasks.push(...inprogressTasks);
       setTasks(todoTasks);
       let newtaskType=destination.droppableId;

       //runmutation (here I used refetch queries instead of just updating the apollo cache)
       updateTaskType({
        variables:{
          id:idToUpdate,
          tasktype:newtaskType,
        },refetchQueries:[{query:GET_TASKS}]
      },)

 }

  return (
    <DragDropContext  onDragEnd={onDragEnd} >
    <div className="body__wrapper" >
      <div className="list__wrapper">
     
      <div className="list__title__wrapper">
      <div class="header__icon--active">
         <img src={Todo_PNG}   width="60" 
           height="60" />
        </div>
        <h2>{TASK_TYPE1_TEXT}</h2>
        <div className="icon__wrapper">
        <TaskAddModal taskType={TASK_TYPE1}/>
        </div>
        
        </div>
        <List columnId={TASK_TYPE1} tasks={todoTasks}/>
      </div>

      <div className="list__wrapper"> 
      <div className="list__title__wrapper">
      <div class="header__icon--active">
         <img src={Inprogress_PNG}   width="60" 
           height="60" />
        </div>
        <h2>{TASK_TYPE2_TEXT}</h2>
        <div className="icon__wrapper">
        <TaskAddModal taskType={TASK_TYPE2}/>
        </div>
        </div>
        <List  columnId={TASK_TYPE2 } tasks={inprogressTasks}/>
        </div>

        <div className="list__wrapper">
        <div className="list__title__wrapper">
        <div class="header__icon--active">
         <img src={Completed_PNG}   width="60" 
           height="60" />
        </div>
          <h2>{TASK_TYPE3_TEXT}</h2>
          <div className="icon__wrapper">
        <TaskAddModal taskType={TASK_TYPE3}/>
        </div>
        </div>
        <List  columnId={TASK_TYPE3} tasks={completedTasks}/>
        </div>
    </div>
    </DragDropContext>
  );
};

export default Body;
