import React, { useState } from "react";
import { Button, Icon, Modal } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import StockoutPrintForm from "./StockoutPrintForm";
//import { useSelector } from "react-redux";

const stockQ = gql`
  query($ID: ID, $stockoutId: String) {
    stock(ID: $ID) {
      ID
      stockId
      productId
      productNm
      spec
      expiredDays
      expiredDate
      unit
      price
      cost
      qty
      stockDate
      type
      status
      memo
      createDT
      createEmp

    },
    stockouts(stockoutId: $stockoutId) {
      stockoutId
      purpose
      }
  }
`;

export default props => {

  // const userName = useSelector(state => state.userName);
  const [open, setOpen] = useState(false);
  const { loading, error } = useQuery(stockQ, {
    variables: { ID: props.printId, purpose: props.purpose },
    pollInterval: 500
  });

  if (loading) {
    return <div>loading...</div>;
  }
  if (error) {
    return <div>發生錯誤了</div>;
  }

  const handleClose = () => setOpen(false);
  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <Modal
      open={open}
      trigger={<Button onClick={handleOpen}>列印標籤</Button>}
      size="large"
      onClose={handleClose}
    >

      <Modal.Content>
        <StockoutPrintForm printId={props.printId} purpose={props.purpose} />


      </Modal.Content>
      <Modal.Actions>
        <Button onClick={handleClose} basic color="red">
          <Icon name="remove" /> 離開
          </Button>
      </Modal.Actions>
    </Modal >
  );
}
