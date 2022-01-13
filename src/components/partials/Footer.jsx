import React from 'react';
import {hasAction, checkPermisions} 		from '../common/Authorize.js';
import { Link } from 'react-router-dom'
import {getLang} 			from '../common/Language.js'

class Footer extends React.Component {
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
			<footer className="footer bg-dark">
				<div className="container">
					<span className="text-muted">B&R 2017 </span>
				</div>
			</footer>
		);
	}
}
export default Footer;
