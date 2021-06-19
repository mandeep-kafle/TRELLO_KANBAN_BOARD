import { gql } from "@apollo/client"

export const CREATE_TASK = gql`
  mutation addTask(
    $taskname: String!,
    $taskdescription: String!,
    $tasktype: String!
  ) {
    insert_TASKS(
      objects: [
        {
          taskname: $taskname
          taskdescription: $taskdescription
          tasktype: $tasktype
        }
      ]
    ) {
      returning {
        id
        taskname
        taskdescription
        tasktype
      }
    }
  }
`
