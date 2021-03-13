import React from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { CTX } from "../../../Store";
import StockinPrintModal from "./StockinPrintModal";

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
  const [appState] = React.useContext(CTX);

  // const userName = useSelector(state => state.userName);
  const { data, loading, error } = useQuery(stockQ, {
    variables: { stockId: appState.stockId },
    pollInterval: 500
  });

  if (loading) {
    return <div>loading...</div>;
  }
  if (error) {
    return <div>發生錯誤了</div>;
  }

  const handleClick = (e, printId) => {
    e.preventDefault();
  };
  return (

    <div align="center">
      {appState.isLevel01Clicked === true &&
        <div>
          <h3 align="center" >入庫明細</h3>
          <h3 align="center" >入庫單號:{appState.stockId} - 入庫原因:{appState.purpose}</h3>
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
                            stock.ID
                          )
                        }
                      >
                        <StockinPrintModal printId={stock.ID} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>}
    </div>
  );
};
