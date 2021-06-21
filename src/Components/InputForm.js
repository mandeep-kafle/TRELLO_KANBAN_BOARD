import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useMutation } from "@apollo/client";
import { FormControl,FormHelperText } from '@material-ui/core';
import {GET_TASKS} from "../Graphql/Queries";
import {CREATE_TASK} from "../Graphql/Mutations";
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

  const [taskDescription, setTaskDescription] = React.useState("");
  const [taskName, setTaskName] = React.useState("");
  const taskType = props.taskType;
  
  const [addTask, { error }] = useMutation(CREATE_TASK,{
    update(cache,{data}){
      const newTASKSResponse=data?.insert_TASKS_one;
      const existingTASKS=cache.readQuery({
        query:GET_TASKS,
      });

      cache.writeQuery({
        query:GET_TASKS,
        data:{
          TASKS:[...existingTASKS?.TASKS,
            newTASKSResponse,
          ],
        },
      });
    }
  });

  const handleDescription = (event) => {

    setTaskDescription(event.target.value);
  };

  const handleTitle = (event) => {
    setTaskName(event.target.value);
  };
  const handleSubmit = (handleClose) => {
    addTask({
        variables: {
          taskname: taskName,
          taskdescription: taskDescription,
          tasktype: taskType,
        },
      } ,);
  
  
      
      if (error) {
        console.log(error);
      }
    handleClose();
  };

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <div>
      <FormControl  >
        <TextField
          id="standard-basic"
          label="TITLE"
          value={taskName}
          onChange={handleTitle}
          required
          aria-describedby="my-helper-text" 
        />
        <FormHelperText id="my-helper-text">Title cannot be empty.</FormHelperText>

        </FormControl>
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
            handleSubmit(props.handleClose);
          }}
        >
          DONE
        </Button>
      </div>
    </form>
  );
}