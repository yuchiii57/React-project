//PDF 
import React from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";

import ReactToPrint from "react-to-print";
import BarcodeProductStock from "../../../API/BarcodeProductStock";

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

function StockoutContent(props) {

  const { data, loading, error } = useQuery(stockQ, {
    variables: { ID: props.printId, stockoutId: props.stockId, purpose: props.purpose },
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
      {/*       <h3 align="center">財團法人台灣省私立香園紀念教養院</h3> */}
      <h3 align="center">品名：{data.stock.productNm}-{data.stock.spec} ${data.stock.price}</h3>
      <h3 align="center">出庫原因：{props.purpose}--單號:{data.stock.stockId}</h3>
      <h3 align="center"><BarcodeProductStock productId={data.stock.productId} /></h3>
    </div>
  );
}

class ComponentToPrint extends React.Component {
  render() {
    return <StockoutContent printId={this.props.printId} purpose={this.props.purpose} />;
  }
}

class StockoutPrintForm extends React.Component {
  render() {
    return (
      <div>
        <ReactToPrint
          trigger={() => <a href="#">列印標籤</a>}
          content={() => this.componentRef}
        />
        <ComponentToPrint printId={this.props.printId} purpose={this.props.purpose} ref={el => (this.componentRef = el)} />

      </div>
    );
  }
}

export default StockoutPrintForm;
