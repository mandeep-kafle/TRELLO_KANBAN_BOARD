import { gql } from "@apollo/client";

export const GET_TASKS = gql`
  query getalltasks {
    TASKS(order_by: {time: asc}) {
      id
      taskname
      taskdescription
      tasktype
      time
    }
  }
`;
