import React, { useState, useEffect, useRef } from 'react';
import { select } from 'd3';

export const DomControl = () => {
	const [ data, setData ] = useState([ 65, 50, 40, 30, 25, 20 ]);
	const svgRefD3 = useRef();

	useEffect(
		() => {
			const svg = select(svgRefD3.current);
			svg
				.selectAll('circle')
				.data(data)
				.join('circle')
				.attr('r', (value) => value)
				.attr('cx', 10)
				.attr('cy', 10)
				.attr('stroke', 'red')
				.attr('transform', 'translate(100,75)');
		},
		[ data ]
	);

	return (
		<div>
			D3 Controlling the SVG DOM
			<svg ref={svgRefD3} className="border bg-gray-500 w-full h-full" />
			<div className="border flex justify-center border-orange-500 overflow-auto">
				<div>
					<p>React Controlling the SVG DOM</p>
					<svg className="border">
						<ellipse
							cx="150"
							cy="80"
							rx="100"
							ry="50"
							style={{ fill: 'yellow', stroke: 'blue', strokeWidth: '2' }}
						/>
						{data.map((item) => (
							<circle
								cx="10"
								cy="10"
								r={item}
								stroke="red"
								transform={`translate(150,75)`}
								className="text-gray-100"
							/>
						))}
					</svg>
					<div>
						<button className="border-2 m-2 p-2" onClick={() => setData(data.map((item) => item + 5))}>
							update
						</button>
						<button className="border-2 m-2 p-2" onClick={() => setData(data.filter((item) => item < 40))}>
							filter
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};
