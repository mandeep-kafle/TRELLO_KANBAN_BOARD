import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import DeleteForeverRoundedIcon from '@material-ui/icons/DeleteForeverRounded';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import {DELETE_TASK,UPDATE_TASK_TYPE} from "../Graphql/Mutations";
import{GET_TASKS} from "../Graphql/Queries"
import { useMutation } from "@apollo/client";
import TaskViewModal from "./TaskViewModal";
import TaskEditModal from "./TaskEditModal";
import {TOTAL_COLUMNS} from "../config";

import {Draggable} from "react-beautiful-dnd";

export default function Item(props) {

 
  const classes = useStyles();

  const [deleteTask, { error }] = useMutation(DELETE_TASK);
  const [updateTaskType ,{err}]=useMutation(UPDATE_TASK_TYPE);

  function handleBack(idToUpdate,taskType) {
    var currentindex=parseInt(taskType)-1;
    // current index after moving left
    currentindex=(((currentindex-1)+TOTAL_COLUMNS)%TOTAL_COLUMNS)+1;
  
    taskType=currentindex.toString();
    updateTaskType({
      variables:{
        id:idToUpdate,
        tasktype:taskType,
      },refetchQueries:[{query:GET_TASKS}]
    },);
  }
  function handleForward(idToUpdate,taskType) {
    var currentindex=parseInt(taskType)-1;
    currentindex=((currentindex+1)%TOTAL_COLUMNS)+1;
    taskType=currentindex.toString();
    updateTaskType({
      variables:{
        id:idToUpdate,
        tasktype:taskType,
      },refetchQueries:[{query:GET_TASKS}]
    },);

  }
function handleDelete(idToRemove) {

  deleteTask({
    variables:{
      id:idToRemove,
    },refetchQueries:[{query: GET_TASKS}]
  },);
}

  return (
    <Draggable draggableId={props.id} index={props.index}>
      {(provided)=>{
        return(
        <div className="card__wrapper" {...provided.draggableProps}
         {...provided.dragHandleProps}
         ref={provided.innerRef}
         >
            <Card className={classes.root} variant="outlined">
            
            <CardContent>
              <Typography
                className={classes.title}
                color="textSecondary"
                gutterBottom
              >
                {props.taskName}
              </Typography>
            </CardContent>
      
            <CardActions>
             
            <TaskViewModal id={props.id} taskType={props.taskType} taskName={props.taskName} taskDescription={props.taskDescription}/>
            <TaskEditModal id={props.id} taskType={props.taskType} taskName={props.taskName} taskDescription={props.taskDescription}/>
            
              <IconButton
                aria-label="delete"
                onClick={() => {
                  handleDelete(props.id);
                }}
              >
                <DeleteForeverRoundedIcon />
              </IconButton>
      
             
             <IconButton
                variant="contained"
                color="primary"
                onClick={() => {
                  handleBack(props.id,props.taskType);
                }}
              >
                <ArrowBackIcon/>
              </IconButton>
              <IconButton
                variant="contained"
                color="primary"
                onClick={() => {
                  handleForward(props.id,props.taskType);
                }}
              >
                <ArrowForwardIcon/>
              </IconButton>
           
            </CardActions>
          </Card>
          </div>
        );
      }
        }

    </Draggable>
  );
}

const useStyles = makeStyles({
  root: {
    minWidth: 30,
    marginBottom: 4,
    
   
  },

  title: {
    fontSize: 30,
    maxWidth:300,
  },
});