import { gql } from "@apollo/client"

export const CREATE_TASK = gql`
mutation addTask($taskname: String!, $taskdescription: String!, $tasktype: String!) {
  insert_TASKS_one(object: {taskname: $taskname, taskdescription: $taskdescription, tasktype: $tasktype}) 
  {
    id
    taskdescription
    taskname
    tasktype
    time
  }
}
`
