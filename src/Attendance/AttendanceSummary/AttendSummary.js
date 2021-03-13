import React from "react";
import "../index.css";
import { useDispatch, useSelector } from "react-redux";
import AttendSummaryMUIT from "./AttendSummaryMUIT";
export default () => {
  const privilege = useSelector(state => state.privilege);

  return (
    <div className="flex-container">
      {/* {privilege.some(e => e.program === "A2" && e.privilege === "Full") &&
        <div>
        </div>}
      {privilege.some(e => e.program === "A2") && */}
      <div>
        <div>
          <AttendSummaryMUIT />
        </div>
      </div>
      {/* } */}
    </div>
  );
};