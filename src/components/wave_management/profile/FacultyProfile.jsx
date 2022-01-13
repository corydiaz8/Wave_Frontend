import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firebaseConnect, isLoaded, isEmpty,getVal } from 'react-redux-firebase'
import Loading 		from 'react-loading';

class FacultyProfile extends React.Component{
	constructor(props){
		super(props)
		this.state = {}
		this.singOut = this.singOut.bind(this)
	}
	componentDidMount(){
	}
	componentWillReceiveProps(nextProps){
	}
	singOut(event){
		const {firebase} = this.props
		firebase.logout()
	}
	rednerDetails(){
		const {faculty,role} = this.props
		if(!faculty || !role){
				return <div className="col-lg-3">
					<div className="name-txt text-center">
						<div className="text-center loading"><Loading  type='spin' color='#fff' delay={0}  /></div>
					</div>
				</div>
		}

		return(
			  <div className="card-body text-center">
			  	<img className="rounded-circle" src={faculty.profile_picture} alt="Generic placeholder image" width="140" height="140" />
			  	<div className="row">
			  		<div className="col-lg-12">
					    <p className="card-name"> {faculty.first_name + " "  + faculty.last_name} . <span className="card-grade">{faculty.position}</span> </p>
			  		</div>
			  		<div className="col-lg-12">
			  			<div className="profile">
				  			<div className="row">
				  				<div className="col-lg-4">
				  					<span className="profile-details text-left">Email:</span>
				  				</div>
				  				<div className="col-lg-8">
				  					<span className="profile-details-item text-left">{faculty.email}</span>
				  				</div>
				  			</div>
				  			<div className="row">
				  				<div className="col-lg-4">
				  					<span className="profile-details text-left">Phone:</span>
				  				</div>
				  				<div className="col-lg-8">
				  					<span className="profile-details-item text-left">{faculty.mobile}</span>
				  				</div>
				  			</div>
				  			<div className="row">
				  					<div className="col-lg-12">
				  						<br/>
				  						<br/>
				  						{ role=="faculty" ? <button  className="btn btn-md bg-red b-round" type="button" onClick={this.singOut}>Sing Out</button> : null}
				  					</div>
				  			</div>
				  		</div>
			  		</div>
			  	</div>
			  </div>
		);
	}
	render(){
		return(
			<div className="card m-top-default">
			 <h5 className="card-title">Profile Details</h5>
			 {this.rednerDetails()}
			</div>
		)
	}
}

const mapStateToProps = (state,props) => {
	return {faculty: state.firebase.data.faculty ?  state.firebase.data.faculty[props.params.id_faculty] : null } // lodash's get can also be used};
};

const firebaseConnectProps = () =>{

}  

export default compose(
	 firebaseConnect((props)=>{
	 	return [
    	'faculty/'+props.params.id_faculty,
  		]
	 })
,connect(mapStateToProps))(FacultyProfile)