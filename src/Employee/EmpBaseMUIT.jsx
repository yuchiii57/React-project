import React from "react";
import MUIDataTable from "mui-datatables";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { CTX } from "../Store";

const employeeQ = gql`
  query($first: Int) {
    employees(first: $first) {
      empId
      empNm
      dep
      depNm
      title
      gender
      ext
      attendanceClass
      fullorPartTime
      status
    }
  }
`;

export default () => {
  const [appState, updateState] = React.useContext(CTX);
  const { data, loading, error } = useQuery(employeeQ, {
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
    { name: "empId", label: "員編" },
    { name: "empNm", label: "姓名" },
    { name: "dep", label: "部門" },
    { name: "depNm", label: "組別" },
    { name: "title", label: "職稱" },
    { name: "gender", label: "性別" },
    { name: "ext", label: "分機" },
    { name: "attendanceClass", label: "班別" },
    { name: "fullorPartTime", label: "全/兼職" },
    { name: "status", label: "狀態" }
  ];

  const muidata = data.employees.map((employee, index) => {
    return {
      id: index,
      ...employee
    };
  });
  // console.log("muidata", muidata);

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
        empId: rowData[0],
        empNm: rowData[1],
        isLevel01Clicked: true,
        isLevel02Clicked: false
      });
      console.log("appState.empId :", appState.empId);
    },
    isRowSelectable: dataIndex => {

    }
  };

  return (
    <div>
      <h3>{appState.empId}-{appState.empNm}</h3>
      <MUIDataTable
        title={"員工基本資料查詢"}
        data={muidata}
        columns={columns}
        options={options}
      />
    </div>
  );
};
