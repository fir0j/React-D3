import React, { Component } from 'react';
import LineChart from './components/LineChart.component';
import BarChart from './components/BarChart.component';
import RadialChart from './components/RadialChart.component';
import { DomControl } from './components/DomControl.component';

class App extends Component {
	// LC Method 1:
	constructor(props) {
		super(props);
		this.state = {
			data: null
		};
	}

	initializeData = () => {
		fetch('https://raw.githubusercontent.com/sxywu/react-d3-example/master/public/sf.json')
			.then((response) => response.json())
			.then((response) => {
				// modifying just data property of the objects in the data returned. Object.assign(target, source)
				return response.map((item) => Object.assign(item, { date: new Date(item.date) }));
			})
			.then((response) => this.setState({ data: response }));
	};

	componentDidMount() {
		this.initializeData();
	}

	render() {
		return (
			<div className="flex flex-wrap">
				<LineChart data={this.state.data} />
				<BarChart data={this.state.data} />
				<RadialChart data={this.state.data} />
				<DomControl />
			</div>
		);
	}
}

export default App;
