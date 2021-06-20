import { gql } from "@apollo/client";

export const SUBSCRIBE_TASKS=gql`
subscription ontodoadded($tasktype: String!) {
    TASKS(where: {tasktype: {_eq: $tasktype}}, order_by: {time: asc}) {
      id
      taskname
      taskdescription
    }
  }
`;