import React from "react";
import EmpBaseMUIT from "./EmpBaseMUIT";
import EmpAddModal from "./EmpAddModal";
import EmpMdyModal from "./EmpMdyModal";
import EmpSubTab from "./EmpSubTab";
import { useSelector } from "react-redux";
import "../index.css";

export default () => {
  const privilege = useSelector(state => state.privilege);

  return (
    <div className="flex-container">
      <div>
        <div>
          {/* {privilege.some(e => e.program === "employee" && e.priAdd === "Y") && */}
            <EmpAddModal />
          {/* {privilege.some(e => e.program === "employee" && e.priMdy === "Y") && */}
            <EmpMdyModal />
        </div>
        <br />
        <div>
          <EmpBaseMUIT />
          <br />
          {/* {privilege.some(e => e.program === "employee" && e.priRead === "N") &&
            } */}
            <EmpSubTab />
        </div>
      </div>
    </div>
  );
};
