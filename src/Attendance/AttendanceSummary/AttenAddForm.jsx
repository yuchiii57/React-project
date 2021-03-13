import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { useSelector } from 'react-redux';

import { Form } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import BarcodeEmp from '../API/BarcodeEmp';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FocusLock from 'react-focus-lock';
const createAttendanceM = gql`
	mutation(
		$empId: String
		$empNm: String
		$createDT: String
		$attendType: String
		$updateType: String
		$updateDT: String
		$memo: String
	) {
		createAttendance(
			empId: $empId
			empNm: $empNm
			createDT: $createDT
			attendType: $attendType
			updateType: $updateType
			updateDT: $updateDT
			memo: $memo
		) {
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

const useStyles = makeStyles((theme) => ({
	formControl: {
		margin: theme.spacing(3)
	},
	group: {
		flexDirection: 'row',
		justifyContent: 'center'
	}
}));

export default () => {

	const classes = useStyles();
	const empNm = useSelector((state) => state.empNm);
	const empId = useSelector((state) => state.empId);

	const createDT = useSelector((state) => state.createDT);
	const [attendType, setAttendType] = useState('上班');
	const [updateType] = useState('刷卡');
	const [memo] = useState('');

	const [onCreateAttendanceM] = useMutation(createAttendanceM, {
		variables: {
			empId,
			empNm,
			createDT,
			attendType,
			updateType,
			memo
		},
		update: (proxy, mutationResult) => {
			// alert("刷卡成功");
		}
	});
	useEffect(
		() => {
			if (empId !== 'XXXXX') {
				onCreateAttendanceM();
			}
		},
		[empId]
	);

	return (
		<Form>
			<div>

				<FormControl className={classes.formControl}>
					<FormLabel value="start">上/下班別</FormLabel>
					<RadioGroup
						aria-label="attendType"
						name="attendType"
						value={attendType}
						checked={attendType}
						className={classes.group}
						onChange={(e, { value }) => {
							setAttendType(e.target.value);
						}}
					>
						<FormControlLabel value="上班" control={<Radio />} label="上班刷卡" />
						<FormControlLabel value="下班" control={<Radio />} label="下班刷卡" />
					</RadioGroup>
				</FormControl>
				<FocusLock>
					<h1 style={{ color: 'red' }}>打卡紀錄</h1>
					<BarcodeEmp />
				</FocusLock>

				<h2 required>
					員工編號: {empId} 員工姓名:{empNm} 打卡日期:{createDT}
				</h2>

			</div>
		</Form>
	);
};
