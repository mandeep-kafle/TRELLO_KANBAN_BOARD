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

export const DELETE_TASK=gql`
mutation deleteTask ($id:uuid){
  delete_TASKS(where: {id: {_eq: $id}}) {
    returning {
      id
    }
  }
}
`

export const UPDATE_TASK=gql`
mutation updateTask($id:uuid,$taskname: String!, $taskdescription: String!){
  update_TASKS(where: {id: {_eq: $id}}, _set: {taskname: $taskname, taskdescription: $taskdescription}) {
    returning {
      id
     
    }
  }
  }
`
export const UPDATE_TASK_TYPE=gql`
mutation updateTaskType($id:uuid,$tasktype: String!){
  update_TASKS(where: {id: {_eq: $id}}, _set: {tasktype: $tasktype}) {
    returning {
      id
     
    }
  }
  }
`
