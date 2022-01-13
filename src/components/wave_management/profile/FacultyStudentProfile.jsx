import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'
import{LOOKUP_STATUS} from "../../common/Helpers.js"
import Loading 		from 'react-loading';

class FacultyStudentProfile extends React.Component{
	constructor(props){
		super(props)
		this.state = {}
		this.singOut = this.singOut.bind(this)
		this.handleChangeLocation = this.handleChangeLocation.bind(this)
	}
	componentDidMount(){
	}
	componentWillReceiveProps(nextProps){
	}
	singOut(event){
		const {firebase} = this.props
		firebase.logout()
	}
	handleChangeLocation(event){

		const{ firebase,params } = this.props
		if(!params.id_student){
			return null
		}
		let location = event.target.value.split("-")

		firebase.update("students/"+params.id_student,{current_location:location[0],currentLocation_type:location[1]})
	}
	hasAuthorization(name){
		const{ role } = this.props
		let hasRolesF =['aprove','decline','view']
		let hasRolesS =['delete']
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
	redirectOn(id){
		const{params} = this.props
		if(!params.id_student){
			return null
		}

		this.props.router.push('/leavedetails/'+params.id_student+"/"+id)
	}
	renderLeaves(){
		const{ leaves,params } = this.props

		if( !params || !leaves){
			return null
		}
		let studentLeaves ={}
		Object.keys(leaves).map((row)=>{
			console.log(leaves[row].student_id)
			if(leaves[row].student_id == params.id_student){
				studentLeaves[row] = leaves[row]
			}
		})
		const renderList = ()=>{
			return Object.keys(studentLeaves).map((row,k)=>
					  	<tr className="cursor-pointer" onClick={(e)=>this.redirectOn(row)} key={k}>
					  		<td className="text-center">{leaves[row].name?leaves[row].name:"-"}</td>
					  		<td className="text-center">{leaves[row].start_date}</td>
					  		<td className="text-center">{leaves[row].end_date}</td>
					  		<td className="text-center"><span className={LOOKUP_STATUS[leaves[row].status]?LOOKUP_STATUS[leaves[row].status].cl:"text-warning"}>{LOOKUP_STATUS[leaves[row].status]? LOOKUP_STATUS[leaves[row].status].name:leaves[row].status}</span></td>
					      	<td>
					      		{ /**
					      			this.hasAuthorization('view')
					      		?
					      			<a onClick={(e)=>this.redirectOn(row)} ><i className="fa fa-eye my-fa"></i> </a>
					      		:null **/}
					      		{ /**this.hasAuthorization('edit') ? <a onClick={(e)=>this.redirectOn(row)} ><i className="fa fa-pencil-alt my-fa"></i> </a> :null **/}
					      		{/**this.hasAuthorization('delete') ? <a onClick={(e)=>this.deleteLeave(row)} ><i className="fa fa-trash my-fa"></i> </a> : null **/}
					      	</td>
						</tr>						
			)
		}
		return( <tbody>{renderList()}</tbody>)
	}
	renderSelect(txt,options,name,key_value,k){
		const{student} = this.props
		if(!options || !student){
			return null
		}
		const optionsList =() =>{
			return Object.keys(options).map((row,key)=>
				  <option key={key} value={options[row][key_value]+"-"+options[row].type}>{options[row][key_value]}</option>
			)
		}
		return <select key={k} value={this.state[name]} className={"form-control theselect bg-principal"} name={name} onChange={(e)=>this.handleChangeLocation(e)} required >
			      <option value={student.current_location?student.current_location:""}>{student.current_location?student.current_location:txt}</option>
			      {optionsList()}
		    </select>
	}
	renderProfileDetails(){
		const {student,locations} = this.props
		if(!student){
				return <div className="col-lg-3">
					<div className="name-txt text-center">
						<div className="text-center loading"><Loading  type='spin' color='#fff' delay={0}  /></div>
					</div>
				</div>
		}

		return(
			  		<div className="col-lg-4">
			  			<br />
			  			<br />
						<img className="rounded-circle" src={student.profile_picture} alt="Generic placeholder image" width="140" height="140" />
			  			<div className="profile">
				  			<div className="row">
				  				<div className="col-lg-12">
				  					<span className="profile-details float-left fname">{student.first_name + " " + student.last_name }</span>
				  					<span className="profile-details grade" >{"." +  student.grade+"th Grade"}</span>
				  				</div>
				  			</div>
				  			<div className="row">
				  				<div className="col-lg-12">
									  	<div className="form-group">
									   		{this.renderSelect('Location',locations,'location','location_name',1)}
									  	</div>
				  				</div>
				  			</div>
				  			<div className="row">
				  				<div className="col-lg-4">
				  					<span className="profile-details">Dorm:</span>
				  				</div>
				  				<div className="col-lg-8">
				  					<span className="profile-details-item">{student.dorm}</span>
				  				</div>
				  			</div>
				  			<div className="row">
				  				<div className="col-lg-4">
				  					<span className="profile-details">Email:</span>
				  				</div>
				  				<div className="col-lg-8">
				  					<span className="profile-details-item">{student.email}</span>
				  				</div>
				  			</div>
				  			<div className="row">
				  				<div className="col-lg-4">
				  					<span className="profile-details">Phone:</span>
				  				</div>
				  				<div className="col-lg-8">
				  					<span className="profile-details-item">{student.mobile}</span>
				  				</div>
				  			</div>
				  		</div>
			  		</div>
		)
	}
	render(){

		return(
			<div className="card m-top-default">
			 <h5 className="card-title">Student Profile</h5>
			  <div className="card-body text-center">
			  	<div className="row">
			  		{this.renderProfileDetails()}
			  		<div className="col-lg-8">
			  			<h2 className="text-left">Student Leaves</h2>
						<table className="table ">
						  <thead>
						    <tr>
						      <th className="td-bold text-center" scope="col">Name</th>
						      <th className="td-bold text-center " scope="col">Start </th>
						      <th className="td-bold text-center " scope="col"> End</th>
						      <th className="td-bold text-center " scope="col"> Status</th>
						    </tr>
						  </thead>
						  {this.renderLeaves()}
						</table>
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
		leaves:state.firebase.data.leaves,
		locations:state.firebase.data.locations,
	};
};

const firebaseConnectProps = () =>{

}  

export default compose(
	 firebaseConnect((props)=>{
	 	return [
    	'students/'+props.params.id_student,
	 	'leave_type',
    	'leaves',
    	'host',
    	'locations',
  		]
	 })
,connect(mapStateToProps))(FacultyStudentProfile)