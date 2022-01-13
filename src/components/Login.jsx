import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'
import { LOGO_LOGIN } from './Config' 

class Login extends React.Component{
	constructor(props){
		super(props)
		this.state = {email:"",password:"",message:""}
		this.handleAdd 		= this.handleAdd.bind(this)
		this.handleChange 	= this.handleChange.bind(this)
	}
	componentDidMount(){}
	handleChange(event){
		let name 	= event.target.name
		let value 	= event.target.value
		this.setState({[name]:value})
		this.props.handleChange(name,value)
	}
	handleAdd(event){
		event.preventClick
		const {firebase,auth} = this.props
		
		let this_ = this
		if(this.state.email =="" || this.state.password ==""){
			this.setState({message:"The username or password is mandatory"})
			setTimeout(function(){
				this_.setState({message:""})
			},3000)
		}else{
			this.props.login(event)
		}

	}
	render(){

		return(
			<div className="text-center">
			    <form className="form-signin">
			      <img className="mb-4" src={LOGO_LOGIN} alt=""  />
			      <div className="box_border">
				      <h1 className="h-login h3 mb-3 font-weight-normal"><strong>LOGIN</strong></h1>
				      <label  className="sr-only">Email address</label>
				      <input value={this.state.email} name="email" type="email" id="inputEmail" className="form-control" placeholder="Email address" required autoFocus onChange={this.handleChange} />
				      <label for="inputPassword" className="sr-only">Password</label>
				      <input value={this.state.password}  name="password" type="password" id="inputPassword" className="form-control" placeholder="Password" required  onChange={this.handleChange}/>
				      <button type="button" className="btn btn-lg btn-primary btn-block" onClick={this.handleAdd}>Sign in</button>
				      <br/>
				      <div className="text-center text-danger">{this.state.message || this.props.message}</div>
			      </div>
			    </form>
		    </div>
		)
	}
}

const mapStateToProps = (state) => {
	
	return {auth: state.firebase.auth};
};

const firebaseConnectProps = () =>{

}  

export default compose(
	 firebaseConnect(['students','faculty'])
,connect(mapStateToProps))(Login)