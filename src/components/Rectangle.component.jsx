import React from 'react';

export const Rectangle = () => {
	// const [ width, setWidth ] = useState();
	// const [ height, setHeight ] = useState();

	// useEffect(() => {
	// 	// Though event listner is added on the resize event, it doesn't have ability to execute the code inside this hook.
	// 	// These code will onll be executed once if no dependency array is passed.
	// 	// But the event listeners have ability to execute code inside ComponentDidMount lifeCycle any no of time.
	// 	// This is one LESS KNOWN FACT ABOUT THE useEffect() and ComponentDidMount()

	// 	window.addEventListener('resize', updateSize);
	// 	return () => {
	// 		window.removeEventListener('resize', updateSize);
	// 	};
	// }, []);

	// const updateSize = () => {
	// 	setWidth(svgRef.current.clientWidth);
	// 	setHeight(svgRef.current.clientHeight);
	// 	console.log(width, height);
	// };

	return (
		<div className="border flex justify-center w-full">
			{/* <svg className="border w-full max-w-screen-xl h-screen90 " viewBox="0 0 20 10" preserveAspectRatio>
				<polygon fill="red" strokeWidth="0" points="0,10 20,10 10,0" />
			</svg> */}

			<svg className="border w-full max-w-screen-xl h-screen90 " viewBox="0 0 200 100" preserveAspectRatio>
				<rect width="200" height="100" fill="lightblue" strokeWidth="0" />
			</svg>
		</div>
	);
};

// import React, { Component } from 'react';

// export class ResponsiveSVG extends Component {
// 	state = {
// 		width: 1024,
// 		height: null
// 	};

// 	svgRef = React.createRef();

// 	componentDidMount() {
// 		console.log('component mounted');
// 		window.addEventListener('resize', this.updateSize);
// 	}

// 	componentWillUnmount() {
// 		console.log('component unmounted');
// 		window.removeEventListener('resize', this.updateSize);
// 	}

// 	updateSize = () => {
// 		this.setState({ width: this.svgRef.current.clientWidth, height: this.svgRef.current.clientHeight });
// 		console.log(this.state.width, this.state.height);
// 	};

// 	render() {
// 		return <svg style={{ width: '100%', height: '100%' }} ref={this.svgRef} />;
// 	}
// }
