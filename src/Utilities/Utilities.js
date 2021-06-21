import {TASK_TYPE1,TASK_TYPE2,TASK_TYPE3} from "../config";


export const OnDragEndUtility=(result,todoTasks,inprogressTasks,completedTasks)=>{
    const {destination ,source,droppableId}=result;
 
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

     let tasks=[];
     tasks.push(...todoTasks);
      tasks.push(...completedTasks);
      tasks.push(...inprogressTasks);
      

     return {idToUpdate,tasks};
}

