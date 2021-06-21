import React from "react";
import TaskCard from './TaskCard';
import {Droppable} from 'react-beautiful-dnd';
function List(props) {
    let tasks=props.tasks;

    let renderTasks = (tasks) => {
      let index=-1;
        return tasks.map((e) => {
          index=index+1;
          return (
            <TaskCard
              index={index}
              id={e.id}
              taskName={e.taskname}
              time={e.time}
              taskType={e.tasktype}
              taskDescription={e.taskdescription}
            />
      
          );
        });
      };
      
    return(
      
      <Droppable droppableId={props.columnId}>
        {provided=>(
           <div className="list__wrapper" 
           ref={provided.innerRef}
            {...provided.droppableProps}
            >
           {renderTasks(tasks)}
           {provided.placeholder}
       </div>
        )}
        
      </Droppable>
       
    );
};

export default List;