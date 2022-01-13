import React from 'react';
import {hasAction, checkPermisions} 		from '../common/Authorize.js';
import { Link } from 'react-router-dom'
import {getLang} 			from '../common/Language.js'

class SetBar extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		
		return (
		  <aside className="control-sidebar control-sidebar-dark"></aside>
		);
	}
}
export default SetBar;
