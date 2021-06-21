import React, { useEffect, useState } from "react";
import { useQuery} from "@apollo/client";
import {DragDropContext} from "react-beautiful-dnd";
import { useMutation } from "@apollo/client";
//-------------------------------------------------------------------------------
//imports form files will be after imports from libraries seprated by a "-----------"
import {UPDATE_TASK_TYPE} from "../Graphql/Mutations";
import ListsWrapper from "./ListsWrapper";
import { GET_TASKS } from "../Graphql/Queries";
import {TASK_TYPE1,TASK_TYPE2,TASK_TYPE3,TASK_TYPE1_TEXT,TASK_TYPE2_TEXT,TASK_TYPE3_TEXT} from "../config";
import "../Styles/Body.css";
import {OnDragEndUtility} from "../Utilities/Utilities";

const Body = () => {

  const { error, loading, data } = useQuery(GET_TASKS);
  const [tasks, setTasks] = useState([]);

 
  useEffect(() => {
    if (data) {
      setTasks(data.TASKS);
      console.log(tasks);
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

       //This function will return new tasks array to render UI and taskid of task to change in Database
      let newTasksAndIdOfDraggedTask=OnDragEndUtility(result,todoTasks,inprogressTasks,completedTasks);

       let idToUpdate=newTasksAndIdOfDraggedTask.idToUpdate;
      
       setTasks(newTasksAndIdOfDraggedTask.tasks);
       let updatedTaskType=destination.droppableId;

       //run mutation (here I tried refetch queries instead of just updating the apollo cache)
       updateTaskType({
        variables:{
          id:idToUpdate,
          tasktype:updatedTaskType,
        },refetchQueries:[{query:GET_TASKS}]
      },)

 }

  return (
    //wrapping up the body component with react-beautiful-dnd
    <DragDropContext  onDragEnd={onDragEnd} >
       <div className="body__wrapper" >
      <ListsWrapper taskName={TASK_TYPE1_TEXT} taskType={TASK_TYPE1} tasks={todoTasks}/>
      <ListsWrapper taskName={TASK_TYPE2_TEXT} taskType={TASK_TYPE2} tasks={inprogressTasks}/>
      <ListsWrapper taskName={TASK_TYPE3_TEXT} taskType={TASK_TYPE3} tasks={completedTasks}/>
      </div>
    </DragDropContext>
  );
};

export default Body;
