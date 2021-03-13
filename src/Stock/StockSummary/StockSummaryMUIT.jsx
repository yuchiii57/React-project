import React from "react";
import MUIDataTable from "mui-datatables";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { CTX } from "../../Store";

const stockSummaryQ = gql`
  query($first: Int) {
    stockSummaries(first: $first) {
      productId
      productNm
      spec
      unit
      price
      cost
      qty
    }
  }
`;

export default () => {
  const [appState, updateState] = React.useContext(CTX);
  const { data, loading, error } = useQuery(stockSummaryQ, {
    variables: { first: 99999 },
    pollInterval: 500
  });

  if (loading) {
    return <div>loading...</div>;
  }
  if (error) {
    return <div>發生錯誤了</div>;
  }

  const columns = [
    {
      name: "productId",
      label: "品號"
    },
    {
      name: "productNm",
      label: "品名"
    },
    {
      name: "spec",
      label: "規格"
    },
    {
      name: "qty",
      label: "數量"
    },
    {
      name: "unit",
      label: "單位"
    }
  ];

  const muidata = data.stockSummaries.map((stockSummary, index) => {
    return {
      id: index,
      ...stockSummary
    };
  });

  const options = {
    filter: true,
    selectableRows: "multiple", //multiple, single, none
    filterType: "dropdown",
    responsive: "scrollMaxHeight",
    rowsPerPage: 5,
    print: false,
    download: false,
    onRowsSelect: (rowsSelected, allRows) => {
    },
    onRowsDelete: rowsDeleted => {
      if (rowsDeleted.data[0].dataIndex === 0) {
        window.alert("Can't delete this!");
        return true;
      }
    },
    onChangePage: numberRows => {
    },
    onSearchChange: searchText => {
    },
    onColumnSortChange: (column, direction) => {
    },
    onColumnViewChange: (column, action) => {
    },
    onFilterChange: (column, filters) => {
    },
    onCellClick: (cellData, cellMeta) => {
    },
    onRowClick: (rowData, rowState) => {
      updateState({ ...appState, productId: rowData[0], productNm: rowData[1] });
    },
    isRowSelectable: dataIndex => {
    }
  };

  return (
    <div>
      <MUIDataTable
        title={"庫存資料"}
        data={muidata}
        columns={columns}
        options={options}
      />
    </div>
  );
};
