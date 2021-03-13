import React, { useState } from "react";
import MUIDataTable from "mui-datatables";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { CTX } from "../../../Store";
import moment from "moment";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";

import DateFnsUtils from "@date-io/date-fns";
import Grid from "@material-ui/core/Grid";

const stockoutQ = gql`
  query($begDt: String, $endDt: String) {
    stockouts(outDate_gte:$begDt, outDate_lte:$endDt) {
      ID
      outDate
      purpose
      stockoutId
      status
      memo
      createDT
      createEmp
    }
  }
`;
export default () => {
  // const StockoutMasterMUIT = () => {
  const [appState, updateState] = React.useContext(CTX);
  const [begDt, setBegDt] = useState(moment().format("YYYY-MM-DD"));
  const [endDt, setEndDt] = useState(moment().add(1, "days").format("YYYY-MM-DD"));
  const { data, loading, error } = useQuery(stockoutQ, {
    variables: { begDt, endDt },
    // pollInterval: 500
  });
  if (loading) {
    return <div>loading...</div>;
  }
  if (error) {
    return <div>發生錯誤了</div>;
  }

  console.log("StockoutMaster", data);
  const columns = [
    {
      name: "ID",
      label: "ID",
      options: { display: false }
    },
    {
      name: "outDate",
      label: "日期",
    },
    {
      name: "stockoutId",
      label: "單號",
    },
    {
      name: "purpose",
      label: "原因",
    },
    {
      name: "status",
      label: "狀態",
    },
    {
      name: "memo",
      label: "備註",
    },
    {
      name: "createEmp",
      label: "建立者",
    }
  ];

  const muidata = data.stockouts.map((stockout, index) => {
    return {
      id: index,
      ...stockout
    };
  });

  const options = {
    filter: true,
    // selectableRows: false,
    selectableRows: "multiple", //multiple, single, none
    filterType: "dropdown",
    responsive: "scrollMaxHeight",
    rowsPerPage: 10,
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
      updateState({
        ...appState,
        stockId: rowData[2],
        purpose: rowData[3],
        isLevel01Clicked: false,
        isLevel02Clicked: true
      });
    },

    isRowSelectable: dataIndex => {

    }
  };

  return (
    <div>
      <Grid container justify="space-around">
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            disableToolbar
            variant="inline"
            format="yyyy-MM-dd"
            margin="normal"
            id="date-picker-inline"
            label="開始日期"
            // value={selectedDate}
            onChange={(date, value) => {
              setBegDt(value);
              updateState({
                ...appState,
                stockId: "",
                stockoutId: ""
              });
              console.log("begin date", value);
            }}
            KeyboardButtonProps={{
              "aria-label": "change date"
            }}
            value={begDt}
          />
        </MuiPickersUtilsProvider>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            disableToolbar
            variant="inline"
            format="yyyy-MM-dd"
            margin="normal"
            id="date-picker-inline"
            label="結束日期"
            onChange={(date, value) => {
              setEndDt(value);
              updateState({
                ...appState,
                stockId: "",
                stockoutId: ""
              });
              console.log("end date", value);
            }}
            KeyboardButtonProps={{
              "aria-label": "change date"
            }}
            value={endDt}
          />
        </MuiPickersUtilsProvider>
      </Grid>
      <MUIDataTable
        title={"出庫查詢"}
        data={muidata}
        columns={columns}
        options={options}
      />
    </div >
  );
};

// export default StockoutMasterMUIT;