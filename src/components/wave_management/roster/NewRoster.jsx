import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'
import Load from '../../common/Load.jsx'
import Loading 		from 'react-loading';
import  Scrollbars  from 'react-scrollbar';
import NewRosterStudents from './StudentsNewRoster'

class NewRoster extends React.Component{
	constructor(props){
		super(props)
		this.state = {title:"",students:[],first_name:""}
		this.handleAdd = this.handleAdd.bind(this)
		this.handleChange = this.handleChange.bind(this)
		this.handleChangeBox = this.handleChangeBox.bind(this)
		this.handleUpdate = this.handleUpdate.bind(this)
		this.handleSearch = this.handleSearch.bind(this)
	}
	handleChange(event){
		this.setState({[event.target.name]:event.target.value})
	}
	handleSearch(event){
		this.setState({[event.target.name]:event.target.value})
	}
	handleChangeBox(rowS,event){
		this.setState({students:rowS})
	}

	componentDidMount(){
	}
	componentWillReceiveProps(nextProps){
	}
	handleAdd(event){
		event.preventClick
		const {firebase,auth,profile} = this.props
		let this_ = this
		if(!this.state.title){
			this.setState({titlemessage:"The rosters name is mandatory"})
			setTimeout(function(){
				this_.setState({titlemessage:""})
			},3000)
			return 
		}
		let values={
			title:this.state.title,
			admin_id:auth.uid,
			students:this.state.students
		}
	
		firebase.push('rosters',values)
		this_.setState({message:"Roster saved successfully"})

		setTimeout(function(){
			this_.setState({message:"",title:"",students:[]})
		},3000)
	}
	handleUpdate(event){
		event.preventClick
		const {firebase,auth,profile,params} = this.props
		if(!params.id){
			return null
		}
		let this_ = this
		if(!this.state.title){
			this.setState({titlemessage:"The rosters name is mandatory"})
			setTimeout(function(){
				this_.setState({titlemessage:""})
			},3000)
			return 
		}
		let values={
			title:this.state.title,
			students:this.state.students
		}
	
		firebase.update('rosters/'+params.id,values)
		this_.setState({message:"Roster saved successfully"})

		setTimeout(function(){
			this_.setState({message:""})
		},3000)
	}
	redirectOnStudent(id){
		this.props.router.push('/s-profile/'+id)
	}
	renderStudents(){
		const{ students,isLoaded } = this.props

		if(!students){
			return <tbody><tr><td colSpan="6"> <div className="text-center loading"><Loading type='spin' color='#457eb5' delay={0}  /></div></td></tr></tbody>
		}

		const studentsList = ()=>{
			return Object.keys(students).map((row,k)=>
				  	<tr   className="cursor-pointer" key={k}>
				  		<td  ><input type="checkbox" data-rowkey={row} defaultChecked={this.state.students.includes(row) ? true : false} onChange={this.handleChangeBox}   /></td>
				      	<td >{students[row].first_name}</td>
				       	<td onClick={(e)=>this.redirectOnStudent(row)}>{students[row].last_name}</td>
				       	<td onClick={(e)=>this.redirectOnStudent(row)}>{students[row].grade}</td>
				       	<td onClick={(e)=>this.redirectOnStudent(row)}>{students[row].gender}</td>
				       	<td onClick={(e)=>this.redirectOnStudent(row)}>{students[row].current_location}</td>
				       	<td onClick={(e)=>this.redirectOnStudent(row)}>{students[row].dorm}</td>
					</tr>
			)
		}

		return( <tbody> {studentsList()} </tbody>)
	}
	renderButtonsActions(){
		const{ params } = this.props
		if(params.id){
			return <button  className="btn btn-md bg-warning b-round" type="button" onClick={this.handleUpdate}>Update Roster</button>
		}
		return <button  className="btn btn-md bg-principal b-round" type="button" onClick={this.handleAdd}>Create Roster</button>
	}
	renderHeader(){
		const{ params,rosters } = this.props
		
		if(params.id && rosters){
		
			return <h5 className="card-title"> { "Update Roster " + this.state.title }</h5>
		}else{
			return <h5 className="card-title">New Roster</h5>
		}
	}
	componentWillReceiveProps(nextProps){
		console.log("Nex",nextProps)
		if(nextProps.rosters || this.props.rosters){
			if(this.props.params.id){
				if(nextProps.rosters.students){
					this.setState({students:nextProps.rosters.students})
				}

				this.setState({title:nextProps.rosters.title})
			}
		}
	}

	passFilters(){
		const{ first_name} = this.state
		let values = {
			first_name:first_name,
		}
		let newValues = {}

		Object.keys(values).map((row)=>{
			if(!values[row]==""){
				newValues[row] = "orderByChild="+row+"&equalTo="+values[row]
			}else{
				newValues[row] = ""
			}
		})
		return newValues
	}
	render(){
		console.log(this.state)
		return(
			<div className="card m-top-default">
			 	{this.renderHeader()}
			  <div className="card-body text-center">
			  	<div className="row">
			  		<div className="col-lg-12">
			  			<div className="form">
			  				<input className="form-control" value={this.state.title} name="title" placeholder="Roster Name" required onChange={this.handleChange}/>
			  				<br />
			  				{this.state.titlemessage?<p className="text-danger">{this.state.titlemessage}</p>:null}
			  			</div>
			  			<br/>
			  			<div className="row">
			  				<div className="col-md-12 col-lg-12">
					  			<div className="form-search">
					  				<input className="form-control" name="first_name" value={this.state.first_name} placeholder="Search By name" onChange={this.handleSearch}/>
					  				<i className="fa fa-search my-fa"></i>
					  			</div>
			  				</div>
			  			</div>
			  			<br/>
			  			<br/>
			          	<Scrollbars speed={1} className="area-table-scroll" horizontal={false} vertical={true} >
							<table className="table ">
							  <thead>
							    <tr>
							      <th className="td-bold text-center" scope="col"></th>
							      <th className="td-bold text-center" scope="col">First Name</th>
							      <th className="td-bold text-center " scope="col">Last Name</th>
							      <th className="td-bold text-center" scope="col">Grade</th>
							      <th className="td-bold text-center" scope="col">Email</th>
							      <th className="td-bold text-center" scope="col">Phone</th>
							      <th className="td-bold text-center" scope="col">Dorm</th>
							    </tr>
							  </thead>
						        <NewRosterStudents key={12} params={this.props.params} stateStudents={this.state.students} filters={this.passFilters()} rosters={this.props.rosters} deleteRosterStudent={this.deleteRosterStudent} handleChangeBox = {this.handleChangeBox} redirectOn={this.redirectOn} />
							</table>
						</Scrollbars>
			  		</div>
			  	</div>
			    <div className="row">
			    	<div className="col-lg-12">
			    		<br />
			    		<div className="">
			    			{this.renderButtonsActions()}
			    		</div>
			    	</div>
			    	<div className="col-lg-12">
			    		<br />
			    		{this.state.message?<p className="text-success">{ this.state.message }</p>:null}
			    	</div>
			    </div>
			  </div>
			</div>
		)
	}
}

const mapStateToProps = (state,props) => {
	let rostersPselect = props.params.id ? state.firebase.data.rosters ?  state.firebase.data.rosters[props.params.id] : null :state.firebase.data.rosters
	return {
		auth: state.firebase.auth,
  		profile: state.firebase.profile,
  	//	students: state.firebase.data.students,
  		rosters:rostersPselect
	};
};

const firebaseConnectProps = () =>{

}  

export default compose(

	 firebaseConnect((props,state)=>{
	 	let rostersP = props.params.id ? 'rosters/'+props.params.id :"rosters"
	 	return [
	 //	'students',
	 	'auth',
	 	'profile',
    	rostersP,
  		]
	 })
,connect(mapStateToProps))(NewRoster)