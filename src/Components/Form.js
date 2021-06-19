import React, { useState } from "react";
import { CREATE_TASK } from "../Graphql/Mutations";
import { useMutation } from "@apollo/client";

function Form() {
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskType, setTaskType] = useState("todo");

  const [addTask, { error }] = useMutation(CREATE_TASK);

  const handleClick = () => {
    addTask({
      variables: {
        taskname: taskName,
        taskdescription: taskDescription,
        tasktype: "todo",
      },
    });

    if (error) {
      console.log(error);
    }
  };
  return (
    <div>
      hello
      <input
        type="text"
        placeholder="taskname"
        onChange={(e) => {
          setTaskName(e.target.value);
        }}
      />
      <input
        type="text"
        placeholder="taskdescription"
        onChange={(e) => {
          setTaskDescription(e.target.value);
        }}
      />
      <button onClick={handleClick}> Create User</button>
    </div>
  );
}

export default Form;
