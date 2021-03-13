import React, { useState } from "react";
import { Button, Header, Icon, Modal } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { CTX } from "../Store";
import PrivilegeMdyForm from "./PrivilegeMdyForm";

const privilegeMangQ = gql`
  query($ID: ID) {
    privilegeMang(ID: $ID) {
      ID,
      program,
      programNm,
      empId,
      empNm,
      privilege,
      priAdd,
      priMdy,
      priDel, 
      priRead, 
      memo,
      updateEmp,
      updateDT,
      updateType,
      createDT,
      createEmp
    }
  }
`;

export default () => {
  const [appState, updateState] = React.useContext(CTX);
  const [open, setOpen] = useState(false);
  const { data, loading, error } = useQuery(privilegeMangQ, {
    variables: { ID: appState.ID },
    pollInterval: 500
  });

  if (loading) {
    return <div>loading...</div>;
  }
  if (error) {
    return <div>修改請先選取權限資料</div>;
  }

  const priData = data.privilegeMang;
  // console.log("mdy employee data", empData);
  const handleClose = () => {
    setOpen(false);
    updateState({
      ...appState,
      isLevel01Clicked: true,
      isLevel02Clicked: false
    });
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <Modal
      open={open}
      trigger={appState.isLevel02Clicked &&
        <Button onClick={handleOpen}>修改</Button>}
      size="large"
      onClose={handleClose}
    >
      <Header icon="archive" content="修改權限設定" />
      <Modal.Content>
        <PrivilegeMdyForm priData={priData} />
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={handleClose} basic color="red">
          <Icon name="remove" /> 離開
        </Button>
      </Modal.Actions>
    </Modal>
  );
};
