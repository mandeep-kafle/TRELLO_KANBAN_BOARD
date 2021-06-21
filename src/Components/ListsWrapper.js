import React from 'react'
import Todo_PNG from "../assets/Todo.png";
import Completed_PNG from "../assets/Completed.png";
import Inprogress_PNG from "../assets/Inprogress.png";
import TaskAddModal from "./TaskAddModal";
import {TASK_TYPE1,TASK_TYPE2,TASK_TYPE3} from "../config";
import List from "./List";
import "../Styles/ListsWrapper.css";

function ListsWrapper(props) {
    let IMAGE_PNG;
    if(props.taskType===TASK_TYPE1)
    {
        IMAGE_PNG =Todo_PNG;
    }
    if(props.taskType===TASK_TYPE2)
    {
        IMAGE_PNG =Inprogress_PNG;
    }
    if(props.taskType===TASK_TYPE3)
    {
        IMAGE_PNG =Completed_PNG;
    }
    return (
        <div className="list__wrapper">
     
        <div className="list__title__wrapper">
        <div class="header__icon--active">
            
           <img src={IMAGE_PNG}   width="60" 
             height="60" />
          </div>
          <h2>{props.taskName}</h2>
          <div className="icon__wrapper">
            {/* taskaddmodal comes with add button on displayed on top of the tasks */}
          <TaskAddModal taskType={props.taskType}/>
          </div>
          
          </div>
          <List columnId={props.taskType} tasks={props.tasks}/>
        </div>
    )
}

export default ListsWrapper;
