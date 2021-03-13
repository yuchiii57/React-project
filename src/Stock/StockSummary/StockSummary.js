import React from "react";
import "../index.css";
import { useDispatch, useSelector } from "react-redux";
import StockSummaryMUIT from "./StockSummaryMUIT";
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
          <StockSummaryMUIT />
        </div>
      </div>
      {/* } */}
    </div>
  );
};