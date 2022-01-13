import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firebaseConnect, isLoaded, isEmpty,getVal } from 'react-redux-firebase'
 

class StudentProfile extends React.Component{
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

	render(){
		const{student,role} = this.props
		if(!student || !role){
			return null
		}
		return(
			<div className="card m-top-default">
			 <h5 className="card-title">Profile Details</h5>
			  <div className="card-body text-center">
			  	<img className="rounded-circle" src={student.profile_picture} alt="Generic placeholder image" width="140" height="140" />
			  	<div className="row">
			  		<div className="col-lg-12">
					    <p className="card-name"> {student.first_name + " "  + student.last_name}  </p>
			  		</div>
			  		<div className="col-lg-12">
			  			<div className="profile">
				  			<div className="row">
				  				<div className="col-lg-6 ">
				  					<span className="profile-details text-left">School</span>
				  				</div>
				  				<div  className="col-lg-6">
				  					<span className="profile-details-item text-left">{student.current_location}</span>
				  				</div>
				  			</div>
				  			<div className="row">
				  				<div className="col-lg-6">
				  					<span className="profile-details text-left">Grade</span>
				  				</div>
				  				<div className="col-lg-6">
				  					<span className="profile-details-item text-left">{student.grade}</span>
				  				</div>
				  			</div>
				  			<div className="row">
				  				<div className="col-lg-6">
				  					<span className="profile-details text-left">Dorm</span>
				  				</div>
				  				<div className="col-lg-6">
				  					<span className="profile-details-item text-left">{student.dorm}</span>
				  				</div>
				  			</div>
				  			<div className="row">
				  				<div className="col-lg-6">
				  					<span className="profile-details text-left">Email</span>
				  				</div>
				  				<div className="col-lg-6">
				  					<span className="profile-details-item text-left">{student.email}</span>
				  				</div>
				  			</div>
				  			<div className="row">
				  				<div className="col-lg-6">
				  					<span className="profile-details text-left">Phone</span>
				  				</div>
				  				<div className="col-lg-6">
				  					<span className="profile-details-item text-left">{student.mobile}</span>
				  				</div>
				  			</div>
				  			<div className="row">
				  					<div className="col-lg-12">
				  						<br/>
				  						<br/>
				  						{ role == "student" ? <button  className="btn btn-md bg-red b-round" type="button" onClick={this.singOut}>Sing Out</button> : null}
				  					</div>
				  			</div>
				  		</div>
			  		</div>
			  	</div>
			    
			  </div>
			</div>
		)
	}
}

const mapStateToProps = (state,props) => {
	return {student: state.firebase.data.students ?  state.firebase.data.students[props.params.id] : null } // lodash's get can also be used};
};

const firebaseConnectProps = () =>{

}  

export default compose(
	 firebaseConnect((props)=>{
	 	console.log("The props",props)
	 	return [
    	'students/'+props.params.id
  		]
	 })
,connect(mapStateToProps))(StudentProfile)