
//require('es6-promise').polyfill();

import 'whatwg-fetch';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { Router, browserHistory } from 'react-router';
import configureStore from './store/configureStore.js';
import getRoutes from './routes.js';
import registerServiceWorker from './registerServiceWorker';

/******************************
*		GLOBAL VARIABLES
*		HOST,LANGUAGE,ECT
******************************/
window.basepath ='/webapp';

window.globalconf ={

	language:{
		en:{},
		it:{},
		instance:'it'
	}
}

const store 	= configureStore(window.INITIAL_STATE); //this is the original 
const hostname 	= window.location.hostname;

window.maggiore = {
	hosts:{
			development:'',
			production:''
	}
}
if(hostname=="localhost"){	
	
}else{
	window.host = window.location.protocol + "//" +  hostname;
}

window.apiPrefix	= "";
window.url_prefix = window.host+window.apiPrefix;

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory} routes={getRoutes(store)}/>
  </Provider>,
  document.getElementById('root')
);
//registerServiceWorker();