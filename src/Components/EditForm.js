import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useMutation } from "@apollo/client";

import {GET_TASKS} from "../Graphql/Queries";
import {UPDATE_TASK} from "../Graphql/Mutations";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

export default function MultilineTextFields(props) {
  const classes = useStyles();

  const [taskDescription, setTaskDescription] = React.useState(props.taskDescription);
  const [taskName, setTaskName] = React.useState(props.taskName);
  const taskType = props.taskType;
  
    const [updateTask,{error}]=useMutation(UPDATE_TASK)

  const handleDescription = (event) => {
    console.log(taskDescription);
    setTaskDescription(event.target.value);
  };

  const handleTitle = (event) => {
    setTaskName(event.target.value);
  };
  const handleSubmit = (handleClose,idToUpdate) => {
        updateTask({
            variables:{
                id:idToUpdate,
                taskname:taskName,
                taskdescription:taskDescription,
            },refetchQueries:[{query:GET_TASKS}]
        },);
  
      
      if (error) {
        console.log(error);
      }
    handleClose();
  };

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <div>
        <TextField
          id="standard-basic"
          label="TITLE"
          value={taskName}
          onChange={handleTitle}
        />

        <TextField
          id="standard-multiline-flexible"
          label="DESCRIPTION"
          multiline
          rowsMax={4}
          value={taskDescription}
          onChange={handleDescription}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            handleSubmit(props.handleClose,props.id);
          }}
        >
          DONE
        </Button>
      </div>
    </form>
  );
}