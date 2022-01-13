import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'
import { IndexLink, Link } from 'react-router';
import { hasAction } 		from '../common/Authorize.js';

import { logout, clearCache } from '../../actions/global.js';
import Loading 		from 'react-loading';
import {instanceLanguage,getInstance,getLang} from '../common/Language.js';
import { LOGO_NAV } from '../Config' 


class Header extends React.Component {
  constructor(props){
    super(props)
    this.state = { link:"home",collapse:false};
    this.singOut = this.singOut.bind(this)
    this.setActiveLink = this.setActiveLink.bind(this)
    this.collapseNav = this.collapseNav.bind(this)
  }

	singOut(event){
		this.props.singOut(event)
	}
	renderFullname(){
		const {auth,profile,role} = this.props
		let Fullname = auth.email
		if(profile){
			Fullname  = profile.first_name + " " + profile.last_name
		}
		return(
			<div className="name-txt float-right">
				<span className="first-span">{Fullname}</span>
			</div>
		)
	}

	renderProfilePicture(){
		const {auth,profile,role} = this.props
		let picture = "https://upload.wikimedia.org/wikipedia/commons/4/4a/Profil_licnosti.png"
		if(profile){
			picture  = profile.profile_picture
		}
		return <img src={picture} />		
	}
	renderLinkRedirect(){
		const {auth,profile,role} = this.props
		let link_ = ""
		switch(role){
			case"faculty":
				link_ = "/f-my-profile/"+auth.uid
			break;
			case"student":
				link_ = "/s-profile/"+auth.uid
			break;
		}
		return link_
	}

	setActiveLink(name,e){
		this.setState({link:name})
	}

	renderProfileDetailsHeader(){
		const {auth,profile,role} = this.props
		
		if( !profile.email && !profile.id ){
			return(
				<div className="name-txt float-right">
					<div className="text-center loading-profile"><Loading width={39} height={39} type='spin' color='#fff' delay={0}  /></div>
				</div>
			) 
		}
		return <Link to={this.renderLinkRedirect()} className="nav-link" >
			<div className="img-profile float-left">
				{this.renderProfilePicture()}
			</div>
			{this.renderFullname()}
		</Link>
	}
	renderLinkActive(link){
		return this.state.link==link  ? "active":""
	}
	hasAuthorization(name){
		const{ role } = this.props
		let hasRolesF =['search','roster']
		let hasRolesS =['myleaves','home-s']
		if(!role){
			return false
		}
		if(role=="faculty" ){

			if(hasRolesF.includes(name)){
				return true
			}
			
		}
		if(role=="student" ){

			if(hasRolesS.includes(name)){
				return true
			}
			
		}
		return false
	}
	collapseNav(){
		const { collapse }= this.state
		let newcollapse = collapse
		if(collapse == false){
			newcollapse = true
		}else{
			newcollapse = false
		}
		this.setState({collapse:newcollapse})

	}
	renderCollapseClass(){
		return this.state.collapse==true ? "collapse navbar-collapse show":"collapse navbar-collapse "
	}
	render() {
		const{auth}=this.props
		return (
			<nav className="navbar navbar-expand-lg  navbar-dark bg-principal ">
			  <a className="navbar-brand" href="#"><img src={LOGO_NAV} /></a>
				  <button onClick={this.collapseNav} className="navbar-toggler" type="button" >
				    <span className="navbar-toggler-icon"></span>
				  </button>
				  <div className={this.renderCollapseClass()} >
			    <ul className="navbar-nav mr-auto">
			      {
			      	this.hasAuthorization('home-s') ? 
				   		<li className={"nav-item " + this.renderLinkActive("home")}>
				        	<Link onClick={(e)=>this.setActiveLink("home",e)}  to={'/studentleaves/'+auth.uid}  className="nav-link" href="#">Home <span className="sr-only">(current)</span></Link>
				      	</li>
				    : null
			      }
			      {
			      	this.hasAuthorization('home-f') ? 
				   		<li className={"nav-item " + this.renderLinkActive("home")}>
				        	<Link onClick={(e)=>this.setActiveLink("home",e)}  to={this.renderLinkRedirect()}  className="nav-link" href="#">Home <span className="sr-only">(current)</span></Link>
				      	</li>
				    : null
			      }
			      {
			      	this.hasAuthorization('search') ? 
				   		<li className={"nav-item " + this.renderLinkActive("search")}>
				        	<Link onClick={(e)=>this.setActiveLink("search",e)}  to='/search' className="nav-link" href="#">Search</Link>
				      	</li>
				    : null
			      }

			      {
			      		this.hasAuthorization('roster') ?
						      <li className={"nav-item " + this.renderLinkActive("roster")}>
						        <Link onClick={(e)=>this.setActiveLink("roster",e)} to='/listroster' className="nav-link" href="#">Roster</Link>
						      </li>			      		
			      		:null
			      }


			      {
			      		this.hasAuthorization('profile') ?
						      <li className={"nav-item " + this.renderLinkActive("profile")}>
						        <Link onClick={(e)=>this.setActiveLink("profile",e)} to={this.renderLinkRedirect()} className="nav-link" href="#">Profile</Link>
						      </li>			      		
			      		:null
			      }

			    </ul>
			    <ul className=" navbar-nav my-2 my-lg-0 ">
			    	<li className="nav-item">
			    		{this.renderProfileDetailsHeader()}
			    	</li>
			    </ul>
			  </div>
			</nav>
		);
	}
}

export default Header