import React, { useState } from "react";
import { Button, Header, Icon, Modal } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import PrivilegeAddForm from "./PrivilegeAddForm";


export default () => {

  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);

  return (
    <Modal
      open={open}
      trigger={<Button onClick={handleOpen}>新增</Button>}
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
