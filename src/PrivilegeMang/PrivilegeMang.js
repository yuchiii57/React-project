import React from "react";
import EmpBaseMUIT from "../Employee/EmpBaseMUIT";
// import EmpSubTab from "../Employee/EmpSubTab";
import PrivilegeBaseMUIT from "./PrivilegeBaseMUIT";
import { useSelector } from "react-redux";
import "../index.css";
import PrivilegeAddModal from "./PrivilegeAddModal";
import PrivilegeMdyModal from "./PrivilegeMdyModal";

export default () => {

  const privilege = useSelector(state => state.privilege);

  return (
    <div className="flex-container">
      <div>
        {/* {privilege.some(e => e.program === "privilege" && e.priAdd === "Y") && */}
          <PrivilegeAddModal />

      </div>
      <br />
      {/* {privilege.some(e => e.program === "privilege") && */}
        <div>


          <EmpBaseMUIT />
          <br />
          {/* privilege.some(e => e.program === "privilege" && e.priMdy === "Y") && */}
            <PrivilegeMdyModal />
  
          <br />
          <PrivilegeBaseMUIT />
          <br />
        </div>

    </div>
  );
};
