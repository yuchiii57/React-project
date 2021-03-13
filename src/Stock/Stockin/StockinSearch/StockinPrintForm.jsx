//PDF 
import React from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";

import ReactToPrint from "react-to-print";
import BarcodeProductStock from "../../../API/BarcodeProductStock";

const stockQ = gql`
  query($ID: ID) {
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

    }
  }
`;

function StockinContent(props) {

  const { data, loading, error } = useQuery(stockQ, {
    variables: { ID: props.printId },
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
      <h3 align="center">品名：-{data.stock.productNm}-{data.stock.spec} ${data.stock.price}</h3>
      <h3 align="center">保存期限：{data.stock.expiredDate}-保存天數{data.stock.expiredDays}</h3>
      <h3 align="center">入庫單號:{data.stock.stockId}</h3>
      <h3 align="center"><BarcodeProductStock productId={data.stock.productId} /></h3>
    </div>
  );
}

class ComponentToPrint extends React.Component {
  render() {
    return <StockinContent printId={this.props.printId} />;
  }
}

class StockinPrintForm extends React.Component {
  render() {
    return (
      <div>
        <ReactToPrint
          trigger={() => <a href="#">列印標籤</a>}
          content={() => this.componentRef}
        />
        <ComponentToPrint printId={this.props.printId} ref={el => (this.componentRef = el)} />

      </div>
    );
  }
}

export default StockinPrintForm;
