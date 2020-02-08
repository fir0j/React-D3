import React, { useState, useEffect } from 'react';
import { DomControl } from './components/DomControl.component';
import * as d3 from 'd3';

const width = 1024;
const height = 500;
const App = () => {
	const [ data, setData ] = useState(null);

	useEffect(() => {
		fetch('https://raw.githubusercontent.com/sxywu/react-d3-example/master/public/sf.json')
			.then((response) => response.json())
			.then((response) => {
				// modifying just data property of the objects in the data returned. Object.assign(target, source)
				return response.map((item) => Object.assign(item, { date: new Date(item.date) }));
			})
			.then((response) => setData(response));
	}, []);

	const barChartData = () => {
		if (!data) return;
		const xScale = d3.scaleTime().range([ 0, width ]);
		const yScale = d3.scaleLinear().range([ height, 0 ]);
		const colorScale = d3.scaleSequential(d3.interpolateSpectral);

		const timeDomain = d3.extent(data, (d) => d.date);
		const tempMax = d3.max(data, (d) => d.high);
		const [ minAvg, maxAvg ] = d3.extent(data, (d) => d.avg);
		xScale.domain(timeDomain);
		yScale.domain([ 0, tempMax ]);
		colorScale.domain([ maxAvg, minAvg ]);

		// calculate x, y, height, and fill for each rectangle
		return data.map((d) => {
			const y1 = yScale(d.high);
			const y2 = yScale(d.low);
			return {
				x: xScale(d.date),
				y: y1,
				height: y2 - y1,
				fill: colorScale(d.avg)
			};
		});
	};

	return (
		<div className="flex flex-wrap justify-around">
			<div className="border mt-2">
				{data && (
					<div>
						<svg width="600" height="300">
							{barChartData().map((item) => (
								<rect x={item.x} y={item.y} width="2" height={item.height} fill={item.fill} />
							))}
						</svg>
					</div>
				)}
			</div>
			<div className="border mt-2">
				{data && (
					<div>
						<svg width="600" height="300">
							{barChartData().map((item) => (
								<rect x={item.x} y={item.y} width="2" height={item.height} fill={item.fill} />
							))}
						</svg>
					</div>
				)}
			</div>
			<div className="border mt-2">
				{data && (
					<div>
						<svg width="600" height="300">
							{barChartData().map((item) => (
								<rect x={item.x} y={item.y} width="2" height={item.height} fill={item.fill} />
							))}
						</svg>
					</div>
				)}
			</div>
			<div className="border mt-2">
				<DomControl />
			</div>
		</div>
	);
};

export default App;
