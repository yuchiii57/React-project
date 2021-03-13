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

const stockinQ = gql`
  query($begDt: String, $endDt: String) {
    stockins(inDate_gte:$begDt, inDate_lte:$endDt) {
      ID
      inDate
      purpose
      stockinId
      status
      memo
      createDT
      createEmp
    }
  }
`;
export default () => {

  const [appState, updateState] = React.useContext(CTX);
  const [begDt, setBegDt] = useState(moment().format("YYYY-MM-DD"));
  const [endDt, setEndDt] = useState(moment().add(1, "days").format("YYYY-MM-DD"));
  const { data, loading, error } = useQuery(stockinQ, {
    variables: { begDt, endDt },
    // pollInterval: 500
  });
  if (loading) {
    return <div>loading...</div>;
  }
  if (error) {
    return <div>發生錯誤了</div>;
  }

  const columns = [
    {
      name: "ID",
      label: "ID",
      options: { display: false }
    },
    {
      name: "inDate",
      label: "日期",
    },
    {
      name: "stockinId",
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

  const muidata = data.stockins.map((stockin, index) => {
    return {
      id: index,
      stockinId: appState.stockinId,
      ...stockin
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
        isLevel01Clicked: true,
        isLevel02Clicked: false
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
              // console.log("begin date", value);
              updateState({
                ...appState,
                stockId: "",
                stockinId: ""
              });
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
                stockinId: ""
              });
              // console.log("end date", value);
            }}
            KeyboardButtonProps={{
              "aria-label": "change date"
            }}
            value={endDt}
          />
        </MuiPickersUtilsProvider>
      </Grid>
      <MUIDataTable
        title={"入庫查詢"}
        data={muidata}
        columns={columns}
        options={options}
      />
    </div >
  );
};
