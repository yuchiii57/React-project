import React, { Component } from 'react';
import Clock from 'react-clock';
import 'react-clock/dist/Clock.css';

export class MyClock extends Component {
	state = {
		date: new Date()
	};

	componentDidMount() {
		setInterval(() => this.setState({ date: new Date() }), 1000);
	}

	render() {
		return (
			<div>
				<h1>目前時間:</h1>
				<Clock size={300} value={this.state.date} />
			</div>
		);
	}
}
