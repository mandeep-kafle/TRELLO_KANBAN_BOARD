import React from "react";
import Item from './Item';

function List(props) {
    let tasks=props.tasks;

    let renderTasks = (tasks) => {
        return tasks.map((e) => {
          return (
            <Item
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
        <div className="list__wrapper">
            {renderTasks(tasks)}
        </div>
    );
};

export default List;