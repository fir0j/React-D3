import React, { useState, useEffect, useRef } from 'react';
import { select } from 'd3';

export const D3Dom = () => {
	const [ data, setData ] = useState([ 200, 100, 80, 60, 45, 5 ]);
	const svgRef = useRef();

	useEffect(
		() => {
			select(svgRef.current)
				// means selectElemnentByRef()  because we cannot selectElementBy Id or Classname in React.
				.selectAll('circle')
				// similar to querySelectorAll('circle') which selects all circle elements inside the DOM selected by select()
				.data(data)
				// for each data in the data array
				.join('circle')
				// appends circle element for each data or iteration and passes all the selected circle elements through d3's enter, update and remove methods

				// after join, all the attributes will be applied for each d3's lifecycle i.e enter, update and remove
				.attr('r', (value) => value)
				.attr('cx', 50)
				.attr('cy', 50)
				.attr('transform', 'translate(640, 150)')
				.attr('stroke', 'red')
				.attr('class', 'fill-current text-orange-200 hover:text-orange-300 cursor-pointer');
		},
		[ data ]
	);

	return (
		<div className="m-auto ">
			<p>D3 Controlling the SVG DOM</p>
			<svg
				ref={svgRef}
				width="1280px"
				height="400px"
				className="border fill-current bg-blue-500"
				viewBox="0 0 1280 400"
			/>
		</div>
	);
};
