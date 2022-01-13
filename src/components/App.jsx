import React from 'react'
import logo from './logo.svg';


import Header from './partials/Header.jsx';
import Sidebar from './partials/Sidebar.jsx';
import Footer from './partials/Footer.jsx';
import SetBar from './partials/AsideSetBar.jsx';
import Login from './Login.jsx';

import browserHistory from 'history/createBrowserHistory'
import { connect } from 'react-redux'
import Loading 		from 'react-loading';
import { getSession, nullRedirect, getLanguage } from '../actions/global.js';
import { getInstance } from './common/Language';

import { compose } from 'redux'
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'

import 'bootstrap';
import './assets/dist/css/style.css'

class App extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			auth:false,
			profile:{},
			role:"",
			email:"",
			password:"",
			message:""
		};

	    this.props.dispatch({
	        type: 'SET_LANGUAGE',
	        lng_instance: getInstance()
	    });
	    this.singOut = this.singOut.bind(this)
	    this.handleLogin = this.handleLogin.bind(this)
	    this.handleChange = this.handleChange.bind(this)
	}
	componentDidMount(){}
	handleChange(name,value){
		this.setState({[name]:value})
	}
	componentWillReceiveProps(nextProps){

		if(nextProps.login_redirect === true ){
			window.location.href= window.host+'/login.php?';
			return;
		}

		if(nextProps.redirect_url){
			browserHistory.push(nextProps.redirect_url);
			this.props.dispatch(nullRedirect());
		}
	}
	singOut(){
		const {firebase} = this.props
		firebase.logout()
	}
	renderLogin(){
		return <div className="login-container bg-login"> <Login login ={this.handleLogin} message={this.state.message} handleChange={this.handleChange} /> </div>
	}
	handleLogin(event){
		event.preventClick
		const {firebase,auth} = this.props
		let this_ = this
		if(this.state.email =="" || this.state.password ==""){
			this.setState({message:"The username or password is mandatory"})
			setTimeout(function(){
				this_.setState({message:""})
			},3000)
		}else{
			firebase.login(this.state).then((result) => {
			 //  this_.props.router.push("/s-profile/"+result.user.uid)
			   this_.setRole(result.user.uid)
			}, (error) => {
			    this.setState({message:error.message})
			});
		}

	}
	setRole(result_id){
		const{ auth,profile,firebase,params } =  this.props
		let userId = auth.uid;
		let this_ = this
		if( ( userId && !this.state.role ) || result_id ){
			if( result_id ){
				userId = result_id
			}

			let therole = ""
			let setRoleStudent = firebase.database().ref('/students/' + userId).once('value').then(function(snapshot) {
			  	var isStudent = snapshot.val() && snapshot.val().email;
			  	let role_name = "student"
			  	if(isStudent){
			  		this_.setState({role:role_name,profile:snapshot.val()})

			  		if(result_id || Object.keys(params).length==0){
			  			this_.props.router.push("/studentleaves/"+userId)
			  		}
			  		
			  	}
			  	therole = role_name
			});

			setRoleStudent = firebase.database().ref('/faculty/' + userId).once('value').then(function(snapshot) {
			  	var isFaculty = snapshot.val() && snapshot.val().email ;
			  	let role_name = "faculty"
			  	if(isFaculty){
			  		this_.setState({role:"faculty",profile: snapshot.val() })
			  		if(result_id || Object.keys(params).length==0){
			  			this_.props.router.push("/search")
			  		}
			  	}
			  	therole = role_name
			});

		}

	}
	renderApp(children){
		const{ auth,profile } =  this.props
		this.setRole(false)

		return(<div>
					<Header router={this.props.router} session={this.props.session} dispatch={this.props.dispatch} loading_cache={this.props.loading_cache} singOut={this.singOut} role={this.state.role} auth={this.props.auth} profile={this.state.profile} />
						<div className="container">
							{ 
								this.state.role 
									? 
									React.cloneElement(children, { role: this.state.role })
									:null

									 

							}
						</div>							
			
			</div>)
	}
	render() {
		console.log("The props",this.props)
		const{ loadingApp,children,auth,firebase } =  this.props

		return auth.isLoaded  ? (

				<div>
					
					{
						!auth.uid  ? 
							this.renderLogin()
						: 
						this.renderApp(children)

					}
					
				  <div className="control-sidebar-bg"></div>
				</div>
		) : (
		<div style={{margin: 'auto',width: '100px',marginTop: '19%'}} className="row pull-center loadingApp">
			<Loading type='spin' color='#457eb5' delay={0}  />
		</div>);
	}
}


const mapStateToProps = (state) => {
	console.log("THe stateeee",state)
	let students = state.firebase.students?state.firebase.students[state.firebase.auth.uid]:null
	if(!students){
		students = state.firebase.faculty?state.firebase.faculty[state.firebase.auth.uid]:null
	}
		console.log("THe stateeeevvvvvvvvvvvvvvvv",students)
	return {
		auth: state.firebase.auth,
  		profile: students?students:{},
  		locations:state.firebase.data.locations,
  	};
};

const firebaseConnectProps = () =>{

}  

export default compose(
	 firebaseConnect((state,props)=>{
	 	return [
	   		'students',
	   		'locations',
	   		'rosters'
	  	]
	 })
,connect(mapStateToProps))(App)