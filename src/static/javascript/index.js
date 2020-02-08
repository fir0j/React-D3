/* eslint-disable getter-return */
// eslint-disable-next-line react/no-typos
import '../styles/index.scss';
import ReactDOM from 'react-dom';
import React from 'react';
import Page from './components/page';
import { HashRouter, Route } from 'react-router-dom';

ReactDOM.render(
	<HashRouter>
		<Page />
	</HashRouter>,
	document.getElementById('root')
);
