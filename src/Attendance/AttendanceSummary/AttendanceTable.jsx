import React from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { useSelector } from "react-redux";

const attendanceQ = gql`
  query($empId: String) {
    attendances(empId: $empId) {
      ID
      empId
      createDT
      attendType
      updateType
      updateDT
      memo

    }
  }
`;

export default () => {

  const userName = useSelector(state => state.userName);
  const empId = useSelector(state => state.empId);
  const { data, loading, error } = useQuery(attendanceQ, {
    variables: { empId: empId },
    pollInterval: 500
  });

  if (loading) {
    return <div>loading...</div>;
  }
  if (error) {
    return <div>發生錯誤了</div>;
  }

  return (
    <div align="center">
      <h3 align="center" >打卡紀錄</h3>
      <br />
      <table border="1">
        <thead className="thead">
          <tr fontSize="20px">
            <td align="end" width="200px">
              上/下班別
            </td>
            <td align="end" width="200px">
              打卡時間
            </td>
          </tr>
        </thead>
        <tbody>
          {data.attendances.map(attendance => {
            return (
              <tr key={attendance.ID}>
                <td>{attendance.attendType}</td>
                <td>{attendance.createDT}</td>

              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
