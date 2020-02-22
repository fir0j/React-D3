import React, { Component } from 'react';
import LineChart from './components/LineChart.component';
import ColumnChart from './components/ColumnChart.component';
import RadialChart from './components/RadialChart.component';
import { D3Dom } from './components/D3Dom.component';
import RowChart from './components/RowChart.component';
import { Rectangle } from './components/Rectangle.component';

class App extends Component {
	// LC Method 1:
	constructor(props) {
		super(props);
		this.state = {
			data: null
		};
	}

	prepareData = () => {
		fetch('https://raw.githubusercontent.com/sxywu/react-d3-example/master/public/sf.json')
			.then((response) => response.json())
			.then((response) => {
				// modifying just data property of the objects in the data returned. Object.assign(target, source)
				return response.map((item) => Object.assign(item, { date: new Date(item.date) }));
			})
			.then((response) => this.setState({ data: response }));
	};

	componentDidMount() {
		this.prepareData();
	}

	render() {
		return (
			<div className="flex flex-wrap">
				<LineChart data={this.state.data} />
				<ColumnChart data={this.state.data} />
				<RadialChart data={this.state.data} />
				<RowChart />
				<Rectangle />
				<D3Dom />
			</div>
		);
	}
}

export default App;
