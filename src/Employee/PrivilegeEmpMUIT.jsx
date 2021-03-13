import React from "react";
import MUIDataTable from "mui-datatables";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { CTX } from "../Store";

const privilegeMangQ = gql`
  query($empId: String) {
    privilegeMangs(empId: $empId) {
      ID
      program
      programNm
      empId
      empNm
      privilege
      priAdd
      priMdy
      priDel 
      priRead
      memo
      updateDT
      updateType
      createDT
      createEmp
    }
  }
`;


export default () => {
  const [appState, updateState] = React.useContext(CTX);
  const { data, loading, error } = useQuery(privilegeMangQ, {
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
    { name: "ID", label: "ID", options: { display: false } },
    { name: "program", label: "程式" },
    { name: "programNm", label: "程式名稱" },
    { name: "empId", label: "工號", options: { display: false } },
    { name: "empNm", label: "姓名" },
    { name: "privilege", label: "權限" },
    { name: "priAdd", label: "新增" },
    { name: "priMdy", label: "修改" },
    { name: "priDel", label: "刪除" },
    { name: "priRead", label: "只能讀取" }

  ];

  const muidata = data.privilegeMangs.map((privilegeMang, index) => {
    return {
      id: index,
      ...privilegeMang
    };
  });
  console.log("Primuidata", muidata);

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
      updateState({ ...appState, ID: rowData[0], isLevel01Clicked: true, });
    },
    isRowSelectable: dataIndex => {

    }
  };

  return (
    <div>

      <MUIDataTable
        title={"權限查詢"}
        data={muidata}
        columns={columns}
        options={options}
      />
    </div>
  );
};
