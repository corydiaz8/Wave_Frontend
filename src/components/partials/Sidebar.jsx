import React from 'react';
import {hasAction, checkPermisions} 		from '../common/Authorize.js';
import { Link } from 'react-router-dom'
import {getLang} 			from '../common/Language.js'

class Sidebar extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		
		let sidebarCls = "";
		if( window.innerWidth < 1024){
			sidebarCls = "nav-xs";
		}
		
		const {session} = this.props.motherProps;
		
		return (
			  <aside className="main-sidebar"></aside>
		);
	}
}
export default Sidebar;
