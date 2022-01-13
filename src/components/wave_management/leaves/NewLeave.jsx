import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import Loading 		from 'react-loading';
import {dateFormat} from  '../../common/Dateformat.js'

class NewLeave extends React.Component{
	getInitialState(){
		return {
			start_date:new Date(),
			end_date:new Date(),
			type:"",
			location:"",
			host:"",
			notes:"",
			transportation:"",
			return_transportation:"",
			status:"",
			student_id:"",
			message:"",
			message_error:"",
			change:false

		}
	}
	constructor(props){
		super(props)
		this.state = this.getInitialState()
		this.handleChange = this.handleChange.bind(this)
		this.handleChangeDate = this.handleChangeDate.bind(this)
		this.handleAddLeave = this.handleAddLeave.bind(this)
		this.handleUpdateLeave = this.handleUpdateLeave.bind(this)
		this.redirectOnStudent = this.redirectOnStudent.bind(this)
	}
	handleChange(event){
		let name 	= event.target.name
		let value 	= event.target.value
		let state = Object.assign({},this.state)
		state[name] = value
		this.setState(state)
		
	}
	handleChangeDate(day,name){
		this.setState({[name]:day})
	}
	componentDidMount(){
		
	}
	componentWillReceiveProps(nextProps){

	}

	renderSelect(txt,options,name,key_value,k){
		if(!options){
			return null
		}
		const optionsList =() =>{
			return Object.keys(options).map((row,key)=>
				  <option key={key} value={options[row][key_value]}>{options[row][key_value]}</option>
			)
		}
		return <select key={k} value={this.state[name]} className={this.renderClass(name)} name={name} onChange={this.handleChange} required >
			      <option value="">{txt}</option>
			      {optionsList()}
		    </select>
	}
	handleAddLeave(event){
		event.preventDefault
		const {params,firebase} = this.props
		let this_ = this
		if(!params.id_student){
			return null
		}
		let values={
			type:this.state.type,
			last_updated_at:new Date(),
			location:this.state.location,
			host:this.state.host,
			notes:this.state.notes,
			start_date:dateFormat(this.state.start_date),
			end_date:dateFormat(this.state.end_date),
			transportation:this.state.transportation,
			return_transportation:this.state.return_transportation,
			status:"pending",
			student_id:params.id_student
		}
		console.log("New Leave",values)
		if(values.type == "" || values.location=="" || values.host=="" || values.start_date=="" || values.end_date==""){
			this_.setState({message_error:"All fields are mandatory",change:true})

			setTimeout(function(){
				this_.setState({message_error:""})
			},3000)
		}else{
			firebase.push("leaves",values)
			this_.setState({message:"Leave saved successfully",change:false})
			setTimeout(function(){
				this_.setState(this_.getInitialState())
			},3000)
		}
	}
	handleUpdateLeave(event){
		const {params,firebase} = this.props
		let this_ = this
		if(!params.id_student && !params.id_leave){
			return null
		}
		let values={
			type:this.state.type,
			last_updated_at:new Date(),
			location:this.state.location,
			host:this.state.host,
			notes:this.state.notes?this.state.notes:"",
			start_date:this.state.start_date,
			end_date:this.state.end_date,
			transportation:this.state.transportation,
			return_transportation:this.state.return_transportation,
			status:"pending",
			student_id:params.id_student
		}

		if(values.type == "" || values.location=="" || values.host=="" || values.start_date=="" || values.end_date==""){
			this_.setState({message_error:"All fields are mandatory",change:true})

			setTimeout(function(){
				this_.setState(this_.getInitialState())
			},3000)
		}else{
			firebase.update("leaves/"+params.id_leave,values)
			this_.setState({message:"Leave updated successfully",change:false})
			setTimeout(function(){
				this_.setState({message:""})
			},3000)
		}
	}
	redirectOnStudent(){
		const {params} = this.props
		this.props.router.push('/studentleaves/'+params.id_student)
	}
	renderSuccess(){
		return this.state.message?<div className="alert alert-success" role="alert">{this.state.message}</div>:null
	}
	renderAlert(){
		return this.state.message_error?<div className="alert alert-danger" role="alert">{this.state.message_error}</div>:null
	}
	renderClass(name){
		return this.state[name]=="" && this.state.change   ? "form-control is-invalid ":"form-control" 
	}
	renderButtonActions(){
		const{params} = this.props
		
		if(params.id_leave){
			return <button onClick={this.handleUpdateLeave}  className="btn btn-md bg-warning b-round" type="button">Update Leave</button>
		}
		return <button onClick={this.handleAddLeave}  className="btn btn-md bg-principal b-round" type="button">Create Leave</button>
	}
	componentWillReceiveProps(nextProps){
		if(nextProps.leaves){
			if(this.props.params.id_leave && this.state.change == false){
				 this.setState({
					last_updated_at:nextProps.leaves.last_updated_at,
					location:nextProps.leaves.location,
					notes:nextProps.leaves.notes,
					start_date:new Date(nextProps.leaves.start_date),
					end_date:new Date(nextProps.leaves.end_date),
					status:nextProps.leaves.status,
					transportation:nextProps.leaves.transportation,
 					return_transportation:nextProps.leaves.return_transportation,
 					type:nextProps.leaves.type,
 					host:nextProps.leaves.host

				 })
			}
		}
	}
	renderHeader(){
		const{ params,leaves } = this.props
		
		if(params.id_leave && leaves){
			return <h5 className="card-title"> { "Update Leave " } <button onClick={this.redirectOnStudent}  className="btn btn-md bg-warning b-round" type="button">Back</button></h5>
		}else{
			return <h5 className="card-title">New Leave <button onClick={this.redirectOnStudent}  className="btn btn-md bg-warning b-round" type="button">Back</button></h5>
		}
	}	
	renderForms(){
		const{ leave_type,transportations, hosts } = this.props
		console.log("OK",this.state)
		return(
			  <div className="card-body text-center">
			  	<div className="row">
			  		<div className="col-lg-12">
						<form style={{maxWidth:'500px',margin:'auto'}}>
						  <div className="form-group">
						    {this.renderSelect('Level Type',leave_type,'type','type',1*3)}
						  </div>
						  <div className="form-group">
						     	{this.renderSelect('Level By',transportations,'transportation','transportation',2*3)}
						  </div>
						  <div className="form-group">
						  		{this.renderSelect('Return By',transportations,'return_transportation','transportation',3*3)}
						  </div>
						  <div className="form-group date_picker_component ">
						        <DayPickerInput className="form-control" value={this.state.start_date?this.state.start_date:new Date()} onDayChange={day => this.handleChangeDate(day,"start_date")} />
						  </div>
						  <div className="form-group date_picker_component">
						    	<DayPickerInput className="form-control" value={this.state.end_date?this.state.end_date:new Date()} onDayChange={day => this.handleChangeDate(day,"end_date")} />
						  </div>
						  <div className="form-group">
						    	{this.renderSelect('Host',hosts,'host','host')}
						  </div>
						  <div className="form-group">
						    <input  type="text" className={this.renderClass("location")} value={this.state.location} name="location" placeholder="Destination"  onChange={this.handleChange} />
						  </div>
						  <div className="form-group">
						    <textarea placeholder="Notes" class="form-control"  rows="3" name="notes"  value={this.state.notes} onChange={this.handleChange}></textarea>
						  </div>
						  <div className="form-group">
						  	{this.renderSuccess()}
						  	{this.renderAlert()}
						  </div>
						</form>
			  		</div>
			  	</div>
			    <div className="row">
			    	<div className="col-lg-12">
			    		<div className="">
			    			{this.renderButtonActions()}
			    		</div>
			    	</div>
			    </div>
			  </div>
		)
	}
	render(){
		console.log("Leaves",this.props)
		const{ leave_type,leaves,hosts,location }= this.props
		return(
			<div className="card m-top-default">
				{this.renderHeader()} 
			 	{leave_type && leaves && hosts && location ?  <div className="text-center loading"><Loading type='spin' color='#457eb5' delay={0}  /></div> : this.renderForms() }
			</div>
		)
	}
}

const mapStateToProps = (state,props) => {
	let leavesPselect = props.params.id_leave ? state.firebase.data.leaves ?  state.firebase.data.leaves[props.params.id_leave] : null :state.firebase.data.leaves
	return {
		student: state.firebase.data.students ?  state.firebase.data.students[props.params.id_student] : null ,
		leaves:leavesPselect,
		leave_type:state.firebase.data.leave_type,
		hosts:state.firebase.data.hosts,
		location:state.firebase.data.location,
		transportations:state.firebase.data.transportations,
	};
};

export default compose(
	 firebaseConnect((props)=>{
	 	let leaveP = props.params.id_leave ? 'leaves/'+props.params.id_leave :"leaves"
	 	return [
    	'students/'+props.params.id_student,
	 	'leave_type',
    	'hosts',
    	'location',
    	'transportations',
    	leaveP
  		]
	 })
,connect(mapStateToProps))(NewLeave)