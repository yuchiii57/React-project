import React from "react";
import MUIDataTable from "mui-datatables";
import Emptemps from "../../api/emptemps";

export default class EmptempsMUIT extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mdyItemNo: ""
    };
  }
  render() {
    const columns = [
      { name: "empId", label: "工號" },
      { name: "empNm", label: "姓名" },
      { name: "depNm", label: "部門" },
      { name: "title", label: "職稱" },
      { name: "gender", label: "性別" },
      { name: "ext", label: "分機" },
      { name: "attendanceClass", label: "班別" },
      { name: "fullorPartTime", label: "全/兼職" }
    ];

    const emptemps = Emptemps.find().fetch();
    const data = emptemps.map((emptemp, index) => {
      return {
        id: index,
        ...emptemp
      };
    });

    const options = {
      filter: true,
      // selectableRows: false,
      selectableRows: "multiple", //multiple, single, none
      filterType: "dropdown",
      responsive: "scrollMaxHeight",
      rowsPerPage: 10,
      onRowsSelect: (rowsSelected, allRows) => {
        // console.log(rowsSelected, allRows);
        //Zconsole.log(rowsSelected, rowData);
      },
      onRowsDelete: rowsDeleted => {
        if (rowsDeleted.data[0].dataIndex === 0) {
          window.alert("Can't delete this!");
          return true;
        }
        console.log(rowsDeleted, "were deleted!");
      },
      onChangePage: numberRows => {
        console.log(numberRows);
      },
      onSearchChange: searchText => {
        console.log(searchText);
      },
      onColumnSortChange: (column, direction) => {
        console.log(column, direction);
      },
      onColumnViewChange: (column, action) => {
        console.log(column, action);
      },
      onFilterChange: (column, filters) => {
        console.log(column, filters);
      },
      onCellClick: (cellData, cellMeta) => {
        console.log(cellData, cellMeta);
      },
      onRowClick: (rowData, rowState) => {
        console.log(rowData, rowState);
        this.setState({ mdyItemNo: rowData[0] });

        console.log("t", this.state.mdyItemNo);
      },
      isRowSelectable: dataIndex => {
        // return data[dataIndex][1] != "Attorney";
      }
    };

    return (
      <div>
        {/* <h1>{appState.empId}</h1> */}
        <MUIDataTable
          title={"員工基本資料查詢"}
          data={data}
          columns={columns}
          options={options}
        />

        {/* <ProductBaseMdyModal mdyItemNo={this.state.mdyItemNo} /> */}
      </div>
    );
  }
}
