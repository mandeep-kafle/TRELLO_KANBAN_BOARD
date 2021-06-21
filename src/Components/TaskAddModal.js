import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import AddBoxIcon from "@material-ui/icons/AddBox";
import IconButton from "@material-ui/core/IconButton";
//-----------------------------------------------------------------
import InputForm from "./InputForm";
import {TASK_TYPE1,TASK_TYPE2,TASK_TYPE3} from "../config";

// jsx styled componenet from material ui
function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

 function TaskAddModal(props) {
   let taskTypetext;
    if(props.taskType===TASK_TYPE1) {taskTypetext="TODO";}
    if(props.taskType===TASK_TYPE2) { taskTypetext="INPROGRESS";}
    if(props.taskType===TASK_TYPE3)  { taskTypetext="DONE";}
    
    
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  
  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title">CREATE-{taskTypetext}</h2>
      <InputForm handleClose={handleClose} taskType={props.taskType}/>
    </div>
  );

  return (
    <div>
      <IconButton aria-label="view" onClick={handleOpen}>
        <AddBoxIcon color="primary" style={{ fontSize: 40 }}  />
      </IconButton>
      <Modal open={open} onClose={handleClose}>
        {body}
      </Modal>
    </div>
  );
}
export default TaskAddModal;