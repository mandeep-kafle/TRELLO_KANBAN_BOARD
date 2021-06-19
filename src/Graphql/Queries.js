import { gql } from "@apollo/client";

export const GET_TASKS = gql`
  query getalltasks {
    TASKS(distinct_on: id) {
      id
      taskdescription
      taskname
      tasktype
      time
    }
  }
`;
