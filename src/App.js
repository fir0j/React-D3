import React, { useState } from 'react';

const App = () => {
	const [ data, setData ] = useState([ 65, 50, 40, 30, 25, 20 ]);

	return (
		<div className="border flex justify-center border-orange-500 overflow-auto">
			<div>
				<p>React Controlling the SVG DOM</p>
				<svg className=" fill-current bg-green-100 border">
					<ellipse
						cx="150"
						cy="80"
						rx="100"
						ry="50"
						style={{ fill: 'orange', stroke: 'blue', strokeWidth: '2' }}
					/>
					{data.map((item) => (
						<circle
							cx="10"
							cy="10"
							r={item}
							stroke="red"
							transform={`translate(150,75)`}
							className="text-orange-300 hover:text-green-500"
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
	);
};

export default App;
