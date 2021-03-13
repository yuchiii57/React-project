import React, { useState } from "react";
import MUIDataTable from "mui-datatables";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { CTX } from "../../Store";

const stockinQ = gql`
  query($first: Int) {
    stockins(first: $first) {
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
      stockinId
      type
      status
    }
  }
`;

export default () => {
	const [appState, updateState] = React.useContext(CTX);
	const { data, loading, error } = useQuery(stockinQ, {
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
			name: "stockinId",
			label: "入庫單號",
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
			name: "indate",
			label: "入庫日期",
		},
		{
			name: "expiredDays",
			label: "保存天數",
		},
		{
			name: "expiredDate",
			label: "有效日期",
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

	const muidata = data.stockins.map((stockin, index) => {
		return {
			id: index,
			...stockin
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
				title={"產品入庫查詢"}
				data={muidata}
				columns={columns}
				options={options}
			/>
		</div >
	);
};

