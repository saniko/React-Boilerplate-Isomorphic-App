// The polyfill will emulate a full ES6 environment (for old browsers)
// (including generators, which means async/await)
import 'babel-polyfill'

import React          			from 'react'
import ReactDOM       			from 'react-dom'

import { render }     			from 'react-isomorphic-render/redux'
import common         			from './main';

// include these assets in webpack build (styles, images)
import htmlAssets 				from './htmlAssets';

import configuration			from '../server/main/configuration';



for (let asset of Object.keys(htmlAssets)) {
	htmlAssets[asset]()
}

const create_routes = require('./routes/routes');

// renders the webpage on the client side
render ({
	// enable/disable development mode (true/false)
	development: configuration.environment.environment === 'development',

	// enable/disable Redux dev-tools (true/false)
	development_tools: configuration.environment.developmentTools ? require('./devtools') : false
}, common);


if(configuration.environment.environment === 'development'){
	module.hot.accept(); // <-- this enables hot module replacement
}
