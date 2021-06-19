import React, { useEffect, useState } from "react";
import { useQuery, gql } from "@apollo/client";
import { GET_TASKS } from "../Graphql/Queries";

const Body = () => {
  const { error, loading, data } = useQuery(GET_TASKS);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if (data) {
      setTasks(data.TASKS);
      console.log(tasks);
      // console.log(data.TASKS);
      //console.log(data);
    }
  }, [data, tasks]);

  return (
    <div>
      {tasks.map((val) => {
        return <h1>{val.taskname}</h1>;
      })}
    </div>
  );
};

export default Body;
