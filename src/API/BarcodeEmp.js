import React from 'react';
import gql from 'graphql-tag';
import { useLazyQuery } from '@apollo/react-hooks';
import { useDispatch } from 'react-redux';
import BarcodeReader from 'react-barcode-reader';

import { setEmpId, setEmpNm, setCreateDT } from '../actions';
import moment from 'moment';

const employeeQ = gql`
	query($empId: String) {
		employees(empId: $empId) {
			empId
			empNm
			depNm
			title
		}
	}
`;

export default () => {
	const dispatch = useDispatch();
	const [loadOptions, { data, loading, error }] = useLazyQuery(employeeQ);

	if (loading) {
		return <div>loading...</div>;
	}
	if (error) {
		return <div>發生錯誤了</div>;
	}
	if (data) {
		dispatch(setEmpId(data.employees[0].empId));
		dispatch(setEmpNm(data.employees[0].empNm));
		dispatch(setCreateDT(moment().format('YYYY-MM-DD HH:mm:ss')));

		//dispatch(setDepNm(data.empolyees[0].depNm));
		//dispatch(setTitle(data.employees[0].title));
	}

	const handleScan = (d) => {
		loadOptions({ variables: { empId: d } });
	};
	const handleError = (err) => {
		console.error(err);
	};

	return (
		<div>
			<BarcodeReader onError={handleError} onScan={handleScan} />
		</div>
	);
};
