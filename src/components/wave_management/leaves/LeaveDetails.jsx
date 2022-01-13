import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'
 

class LeaveDetails extends React.Component{
	constructor(props){
		super(props)
		this.state = {}
		this.handleAdd = this.handleAdd.bind(this)
		this.handleAproveLeave   = this.handleAproveLeave.bind(this) 
		this.handleDeclineLeave  = this.handleDeclineLeave.bind(this)
		this.handleDeleteLeave   = this.handleDeleteLeave.bind(this)
		this.setMessage = this.setMessage.bind(this)
	}
	componentDidMount(){}
	componentWillReceiveProps(nextProps){}
	handleAproveLeave(event){
		const {leave,firebase,params} = this.props
		if(!leave){
			return null
		}
		let this_ = this

		firebase.update('leaves/'+params.id_leave,{status:"approved"})
		this.setMessage("Leave is approved",event)

		setTimeout(function(){
			this_.props.router.push('/faculty-s-profile/'+params.id_student)
		},2000)	

	}
	handleDeclineLeave(event){
		const {leave,firebase,params} = this.props
		if(!leave){
			return null
		}
		let this_ = this
		firebase.update('leaves/'+params.id_leave,{status:"disapproved"})
		this.setMessage("Leave is disapproved",event)

		setTimeout(function(){
			this_.props.router.push('/faculty-s-profile/'+params.id_student)
		},2000)	
	}
	handleDeleteLeave(event){
		const {leave,firebase,params} = this.props
		let this_ = this
		if(window.confirm("Are you sure to want to delete this Leave")){

			firebase.remove('leaves/'+params.id_leave)
			this.setMessage("Leave is deleted",event)

			setTimeout(function(){
				this_.props.router.push('/studentleaves/'+params.id_student)
			},2000)	
		}
		
		
	}
	setMessage(txt){
		this.setState({message:txt})
		let this_ = this
		setTimeout(function(){
			this_.setState({message:""})
		},3000)	
	}
	handleAdd(event){
	}
	leaveDetails(){
		const{ leave } = this.props
		if(!leave){
			return null
		}
		return(<div>
				<div className="row">
	  				<div className="col-lg-5">
		  				<div className="leave-item">
		  					<p>Level Type: </p>
		  				</div>
	  				</div>
	  				<div className="col-lg-5">
						<div className="leave-value">
							<p>{leave.type}</p>
						</div>
	  				</div>
	  			</div>
	  			<div className="row">
	  				<div className="col-lg-5">
		  				<div className="leave-item">
		  					<p>Level By: </p>
		  				</div>
	  				</div>
	  				<div className="col-lg-5">
						<div className="leave-value">
							<p>{leave.transportation}</p>
						</div>
	  				</div>
	  			</div>
	  			<div className="row">

	  				<div className="col-lg-5">
		  				<div className="leave-item">
		  					<p>Render By: </p>
		  				</div>
	  				</div>
	  				<div className="col-lg-5">
						<div className="leave-value">
							<p>{leave.return_transportation}</p>
						</div>
	  				</div>
	  			</div>	

	  			<div className="row">

	  				<div className="col-lg-5">
		  				<div className="leave-item">
		  					<p>Start Date: </p>
		  				</div>
	  				</div>
	  				<div className="col-lg-5">
						<div className="leave-value">
							<p>{leave.start_date}</p>
						</div>
	  				</div>
	  			</div>	
	  			<div className="row">

	  				<div className="col-lg-5">
		  				<div className="leave-item">
		  					<p>End Date: </p>
		  				</div>
	  				</div>
	  				<div className="col-lg-5">
						<div className="leave-value">
							<p>{leave.end_date}</p>
						</div>
	  				</div>
	  			</div>	
	  			<div className="row">

	  				<div className="col-lg-5">
		  				<div className="leave-item">
		  					<p>Host: </p>
		  				</div>
	  				</div>
	  				<div className="col-lg-5">
						<div className="leave-value">
							<p>{leave.host}</p>
						</div>
	  				</div>
	  			</div>	
	  			<div className="row">

	  				<div className="col-lg-5">
		  				<div className="leave-item">
		  					<p>Destination: </p>
		  				</div>
	  				</div>
	  				<div className="col-lg-5">
						<div className="leave-value">
							<p>{leave.location}</p>
						</div>
	  				</div>
	  			</div>
	  		</div>		
		);		
	}
	renderDetailsNote(){
		const{ leave } = this.props
		if(!leave){
			return null
		}
		return(<p className="text-left"> {leave.notes} </p>);		
	}
	renderMessages(){
		return this.state.message?<div className="alert alert-success" role="alert">{this.state.message}</div>:null
	}
	redirectOnNew(e){
		e.preventDefault
		const{params} = this.props
		this.props.router.push('/newleave/'+params.id_student+"/"+params.id_leave)
	}
	hasAuthorization(name){
		const{ role } = this.props
		let hasRolesF =['approve','decline']
		let hasRolesS =['delete','edit']
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
	render(){
		return(
			<div className="card m-top-default">
			 <h5 className="card-title">Leave Details</h5>
			  <div className="card-body text-left">
			  	<div className="row">
			  		<div className="col-lg-6">
			  				{this.leaveDetails()}
			  		</div>
			  	</div>
			    <div className="row">
			    	<div className="col-lg-12">
			    		<h5 className="text-left">Note</h5>
			    		{this.renderDetailsNote()}
			    		<br />
			    	</div>
			    	<div className="col-lg-12">
			    		<div className="">
							<div>
							{ 
								this.hasAuthorization('approve') ? <button  onClick={this.handleAproveLeave}  	className="btn  m-t-10 btn-md bg-principal b-round m-r" type="button">Approve Leave Leave</button> : null

							}
							  
							{this.hasAuthorization('decline') ? <button  onClick={this.handleDeclineLeave}   className=" m-t-10 btn btn-md bg-inverse-principal b-round  m-r" type="button">Decline Leave</button>: null } 	
							
							{this.hasAuthorization('delete') ? <button  onClick={this.handleDeleteLeave}   className=" m-t-10 btn btn-md bg-red b-round  m-r" type="button">Delete Leave</button> : null }

							{ this.hasAuthorization('edit') ? <button className="btn btn-md bg-warning m-t-10 b-round m-r "   onClick={(e)=>this.redirectOnNew(e)}>  Edit </button> : null }
							</div>
			    		</div>
			    	</div>
			    	<div className="col-lg-12">
			    	<br />
			    		{this.renderMessages()}
			    	</div>
			    </div>
			  </div>
			</div>
		)
	}
}

const mapStateToProps = (state,props) => {
	return {
		student: state.firebase.data.students ?  state.firebase.data.students[props.params.id_student] : null ,
		leave: state.firebase.data.leaves ?  state.firebase.data.leaves[props.params.id_leave] : null,
		leave_type:state.firebase.data.leave_type,
		host:state.firebase.data.host,
		location:state.firebase.data.location,
		rosters:state.firebase.data.rosters
	};
};

export default compose(
	 firebaseConnect((props)=>{
	 	return [
    	'students/'+props.params.id_student,
    	'leaves/'+props.params.id_leave,
	 	'leave_type',
    	'leaves',
    	'host',
    	'location',
  		]
	 })
,connect(mapStateToProps))(LeaveDetails)