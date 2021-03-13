import React, { useState } from "react";
import MUIDataTable from "mui-datatables";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { CTX } from "../../Store";

const stockoutQ = gql`
  query($first: Int) {
    stockouts(first: $first) {
			productId
      productNm
      spec
      expiredDays
      expiredDate
      unit
      price
      cost
      qty
      indate
      memo
      stockoutId
      type
      status
    }
  }
`;

export default () => {
	const [appState, updateState] = React.useContext(CTX);
	const { data, loading, error } = useQuery(stockoutQ, {
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
			name: "stockoutId",
			label: "出庫單號",
		},
		{
			name: "productId",
			label: "編號",
		},
		{
			name: "productNm",
			label: "品名",
		},
		{
			name: "spec",
			label: "規格",
		},
		{
			name: "qty",
			label: "數量",
		},
		{
			name: "unit",
			label: "單位",
		},
		{
			name: "outDate",
			label: "出庫日期",
		},
		{
			name: "expiredDays",
			label: "保存天數",
		},
		{
			name: "price",
			label: "單價",
		},
		{
			name: "cost",
			label: "成本",
		},
		{
			name: "memo",
			label: "備註",
		}
	];

	const muidata = data.stockouts.map((stockout, index) => {
		return {
			id: index,
			...stockout
		};
	});;

	const options = {
		filter: true,
		// selectableRows: false,
		selectableRows: "multiple", //multiple, single, none
		filterType: "dropdown",
		responsive: "scrollMaxHeight",
		rowsPerPage: 10,
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
			// updateState({ ...appState });

		},

		isRowSelectable: dataIndex => {

		}
	};

	return (
		<div>
			<MUIDataTable
				title={"產品出庫查詢"}
				data={muidata}
				columns={columns}
				options={options}
			/>
		</div >
	);
};

