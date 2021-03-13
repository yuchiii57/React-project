//import React from "react";
import React, { useState } from "react";
import MUIDataTable from "mui-datatables";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { CTX } from "../../Store";
import moment from "moment";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";

import DateFnsUtils from "@date-io/date-fns";
import Grid from "@material-ui/core/Grid";

const attendanceQ = gql`
  query($begDt: String, $endDt: String) {
    attendances(outDate_gte:$begDt, outDate_lte:$endDt) {
      ID
      empId
      empNm
      createDT
      attendType
      updateType
      updateDT
      memo
    }
  }
`;

export default () => {
  const [appState, updateState] = React.useContext(CTX);
  const [begDt, setBegDt] = useState(moment().format("YYYY-MM-DD"));
  const [endDt, setEndDt] = useState(moment().add(1, "days").format("YYYY-MM-DD"));
  const { data, loading, error } = useQuery(attendanceQ, {
    variables: { empId: appState.empId },
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
      name: "empId",
      label: "員工編號"
    },
    {
      name: "empNm",
      label: "員工姓名"
    },
    {
      name: "attendType",
      label: "上/下班別"
    },
    {
      name: "memo",
      label: "memo"
    }
  ];

  const muidata = data.attendances.map((attendance, index) => {
    return {
      id: index,
      ...attendance
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
      updateState({ ...appState, empId: rowData[0], empNm: rowData[1] });
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
                empId: "",
                empNm: ""
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
                empId: "",
                empNm: ""
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
        title={"出勤紀錄"}
        data={muidata}
        columns={columns}
        options={options}
      />
    </div>
  );
};
