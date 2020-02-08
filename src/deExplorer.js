import React from 'react';
import * as d3 from 'd3';

const BarChartReactControl = ({ width, height, data }) => {
	const xScale = d3.scaleBand().domain(d3.range(0, data.length)).range([ 0, width ]);
	const yScale = d3.scaleLinear().domain([ -3, 3 ]).range([ 0, height ]);
	const bars = data.map((d) => (
		<rect
			key={d.x}
			x={xScale(d.x)}
			y={yScale(d.y)}
			width={xScale.bandwidth()}
			height={height - yScale(d.y)}
			fill={d.color}
		/>
	));

	return (
		<svg width={width} height={height}>
			{bars}
		</svg>
	);
};

const App = () => {
	const data = [ { x: '10px', y: '15px', color: 'blue' }, { x: '12px', y: '20px', color: 'green' } ];

	return (
		<div>
			<div>
				<svg>
					<BarChartReactControl width="400px" height="300px" data={data} />
				</svg>
			</div>
		</div>
	);
};

export default App;
