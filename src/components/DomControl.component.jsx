import React, { useState, useEffect, useRef } from 'react';
import { select } from 'd3';

export const DomControl = () => {
	const [ data, setData ] = useState([ 65, 50, 40, 30, 25, 20 ]);
	const svgRef = useRef();

	useEffect(
		() => {
			const svg = select(svgRef.current);
			svg
				.selectAll('circle')
				.data(data)
				.join('circle')
				// these attributes will be applied to all the elements which enters ENTER PHASE as well as UPDATE PHASE of D3
				.attr('r', (value) => value)
				.attr('cx', 10)
				.attr('cy', 10)
				.attr('stroke', 'red')
				.attr('transform', 'translate(150,75)')
				.attr('class', 'fill-current text-orange-200 hover:text-orange-300 cursor-pointer');
		},
		[ data ]
	);

	return (
		<div className="mt-20">
			<div className="flex">
				<div>
					<p>D3 Controlling the SVG DOM</p>
					<svg ref={svgRef} />
				</div>
				<div>
					<p>React Controlling the SVG DOM</p>
					<svg>
						{data.map((item) => (
							<circle
								key={item}
								cx="10"
								cy="10"
								r={item}
								stroke="red"
								transform="translate(150,75)"
								className="fill-current text-orange-200 hover:text-orange-300 cursor-pointer"
							/>
						))}
					</svg>
				</div>
			</div>
			<div className="flex justify-center">
				<button className="border-2 m-2 p-2" onClick={() => setData(data.map((item) => item + 5))}>
					update
				</button>
				<button className="border-2 m-2 p-2" onClick={() => setData(data.filter((item) => item < 40))}>
					filter
				</button>
			</div>
		</div>
	);
};
