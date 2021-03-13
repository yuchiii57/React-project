import React, { useState } from "react";
import { Button, Header, Icon, Modal } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import { CTX } from "../Store";
import PrivilegeAddForm from "./PrivilegeAddForm";


export default () => {
  const [appState, updateState] = React.useContext(CTX);
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
    updateState({
      ...appState,
      isLevel01Clicked: true,
      isLevel02Clicked: false
    });
  };
  const handleOpen = () => setOpen(true);

  return (
    <Modal
      open={open}
      trigger={appState.isLevel01Clicked &&
        <Button onClick={handleOpen}>新增</Button>}
      size="large"
      onClose={handleClose}
    >
      <Header icon="archive" content="新增權限設定" />
      <Modal.Content>
        <PrivilegeAddForm />
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={handleClose} basic color="red">
          <Icon name="remove" /> 離開
          </Button>
      </Modal.Actions>
    </Modal >
  );
}
