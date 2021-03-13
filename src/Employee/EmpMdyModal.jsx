import React, { useState } from "react";
import { Button, Header, Icon, Modal } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { CTX } from "../Store";

import EmpMdyForm from "./EmpMdyForm";

const employeeQ = gql`
  query($empId: String) {
    employee(empId: $empId) {
      empId
      empNm
      dep
      depNm
      title
      gender
      ext
      attendanceClass
      fullorPartTime
      status
      age
      birth
      empIdNo
      marriage
      school
      subject
      residenceAddr
      contactAddr
      contactTel
      cellphone
      contact01
      contactTel01
      contact02
      contactTel02
      privateEmail
      officialEmail
      license01
      license02
      license03
      lineManager
      depManager
      deputy
      resignDT
      memo
    }
  }
`;

export default () => {
  const [appState, updateState] = React.useContext(CTX);
  const [open, setOpen] = useState(false);
  const { data, loading, error } = useQuery(employeeQ, {
    variables: { empId: appState.empId },
    pollInterval: 500
  });

  if (loading) {
    return <div>loading...</div>;
  }
  if (error) {
    return <div>修改請先選取員工資料</div>;
  }

  const empData = data.employee;
  // console.log("mdy employee data", empData);
  const handleClose = () => {
    setOpen(false);
    updateState({
      ...appState,
      isLevel01Clicked: false
    });
  };
  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <Modal
      open={open}
      trigger={appState.isLevel01Clicked &&
        <Button onClick={handleOpen}>修改</Button>}
      size="large"
      onClose={handleClose}
    >
      <Header icon="archive" content="修改員工資料" />
      <Modal.Content>
        <EmpMdyForm empData={empData} />
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={handleClose} basic color="red">
          <Icon name="remove" /> 離開
        </Button>
      </Modal.Actions>
    </Modal>
  );
};
