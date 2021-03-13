import React from 'react';
import { Tab } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

import AttenAddForm from './AttenAddForm';
import AttendSummaryMUIT from './AttendanceSummary/AttendSummaryMUIT';
import { MyClock } from '../API/MyClock';

import './Attendance.css';

export default () => {
	const panes = [
		{
			menuItem: '新增打卡',
			render: () => (
				<Tab.Pane>
					<div className="fixed-size-container">
						<div className="fixed-size">
							<MyClock />
						</div>
						<div className="fixed-size">
							<AttenAddForm />
						</div>
					</div>
				</Tab.Pane>
			)
		},
		{
			menuItem: '出勤查詢',
			render: () => (
				<Tab.Pane>
					<div>
						<AttendSummaryMUIT />
					</div>
				</Tab.Pane>
			)
		}
	];

	return (
		<Tab
			style={{
				overflow: 'auto'
			}}
			panes={panes}
		/>
	);
};
