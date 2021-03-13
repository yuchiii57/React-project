import React, { useState } from "react";
import gql from "graphql-tag";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { useSelector } from "react-redux";
import moment from "moment";
import "./Stock.css";
import BarcodeStockin from "../../API/BarcodeStockin";

const deleteStock = gql`
  mutation($ID: ID!) {
    deleteStock(ID: $ID) {
      ID
    }
  }
`;

const stockQ = gql`
  query($stockId: String) {
    stocks(stockId: $stockId) {
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

export default () => {

  const userName = useSelector(state => state.userName);
  const stockId = useSelector(state => state.stockinId);
  const purpose = useSelector(state => state.purpose);
  const [createDT] = useState(moment().format("YYYY-MM-DD"));
  const [ID, setID] = useState("");
  const { data, loading, error } = useQuery(stockQ, {
    variables: { stockId: stockId, type: "入庫" },
    pollInterval: 500
  });

  const [onDeleteStock] = useMutation(deleteStock);

  if (loading) {
    return <div>loading...</div>;
  }
  if (error) {
    return <div>發生錯誤了</div>;
  }

  const handleClick = (e, delID, delStockId) => {
    e.preventDefault();
    console.log("test", e.target, delID, delStockId);
    setID(delID);
    console.log("ID", ID);
    onDeleteStock({ variables: { ID: delID } });
    // alert("刪除成功");
  };

  return (
    <div align="center">
      <h3 align="center" >入庫明細</h3>
      <h3 align="center" >入庫單號:{stockId} - 入庫原因:{purpose} ** 建檔員工: {userName} ** {createDT}</h3>
      <BarcodeStockin stockId={stockId} />
      <br />
      <table border="1">
        <thead className="thead">
          <tr fontSize="20px">
            <td width="200px">品號</td>
            <td width="200px">品名</td>
            <td align="end" width="100px">
              規格
            </td>
            <td align="end" width="100px">
              保存天數
            </td>
            <td align="end" width="100px">
              保存期限
            </td>
            <td align="end" width="100px">
              單價
            </td>
            <td align="end" width="100px">
              數量
            </td>
            <td align="end" width="100px">
              單位
            </td>
            <td align="end" width="100px">
            </td>
          </tr>
        </thead>
        <tbody>
          {data.stocks.map(stock => {
            return (
              <tr key={stock.ID}>
                <td>{stock.productId}</td>
                <td>{stock.productNm}</td>
                <td align="center">{stock.spec}</td>
                <td align="end">{stock.expiredDays}</td>
                <td align="center">{stock.expiredDate}</td>
                <td align="end">{stock.price}</td>
                <td align="end">{stock.qty}</td>
                <td align="end">{stock.unit}</td>
                <td>
                  <button className="button"
                    onClick={e =>
                      handleClick(
                        e,
                        stock.ID,
                        stock.stockId)
                    }
                  >
                    刪除
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
