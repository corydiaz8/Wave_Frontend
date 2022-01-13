import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'
import Loading 		from 'react-loading';
import RosterStudents from './RosterStudents'
import  Scrollbars  from 'react-scrollbar';

class RosterDetails extends React.Component{
	getInitialState(){
		return {
			first_name:"",
			message:""
		}
	}
	constructor(props){
		super(props)
		this.state = this.getInitialState()
		this.handleSearch = this.handleSearch.bind(this)
		this.handleAdd = this.handleAdd.bind(this)
		this.deleteRosterStudent = this.deleteRosterStudent.bind(this)
		this.handleDeleteRoster = this.handleDeleteRoster.bind(this)
	}
	handleSearch(event){
		this.setState({[event.target.name]:event.target.value})
	}
	componentWillReceiveProps(nextProps){}
	deleteRosterStudent(row,event){
		const  {params,roster,firebase} = this.props
		if(!params.id){
			return null
		}
		if( window.confirm("Are you sure you wish to delete this item")){

			if(roster.students.indexOf(row) != -1 ){
				roster.students.splice(roster.students.indexOf(row),1);	
			}

			firebase.update(`rosters/${params.id}`, { students: roster.students  })

			let this_ = this
			this.setState({message:"Roster Student deleted succesfully"})
			setTimeout(function(){
				this_.setState({message:""})
			},3000)
		}

	}
	handleDeleteRoster(event){
		const {leave,firebase,params} = this.props
		let this_ = this
		if(window.confirm("Are you sure to want to delete this Roster")){

			firebase.remove('rosters/'+params.id)
			this.setState({message:"Roster is deleted"})

			setTimeout(function(){
				this_.props.router.push('/listroster')
			},2000)	
		}
		
		
	}
	handleAdd(event){
		event.preventClick
		const {firebase} = this.props
		firebase.push('authors', { name: 'Klevis Cipi', done: 12 })
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
	renderSuccess(){
		return this.state.message?<div className="alert alert-success" role="alert">{this.state.message}</div>:null
	}
	render(){
		console.log("rosters",this.props)
		const  { roster,params} = this.props
		if(!roster || !params.id){
			return null
		}
		return(
			<div className="card m-top-default">
			 <h5 className="card-title"> {this.props.roster.title}
			 	<a onClick={(e)=>this.props.router.push('/newroster/'+params.id)}> <i className="fa fa-pencil-alt"></i>  Edit </a>
			 	{<button onClick={this.handleDeleteRoster}  className="btn btn-md float-right bg-red b-round" type="button">Delete Roster</button>}
			 </h5>
			  <div className="card-body text-center">
			  	<div className="row">
			  		<div className="col-lg-12">
			  			<div className="form-search">
			  				<input className="form-control" name="first_name" value={this.state.first_name} placeholder="Search By name" onChange={this.handleSearch}/>
			  				<i className="fa fa-search my-fa"></i>
			  			</div>
			  			<br/>
			  			{this.renderSuccess()}
			  			<Scrollbars speed={1} className="area-table-scroll" horizontal={false} vertical={true} >
						<table className="table ">
						  <thead>
						    <tr>
						      <th className="td-bold text-center" scope="col">First Name</th>
						      <th className="td-bold text-center " scope="col">Last Name</th>
						      <th className="td-bold text-center" scope="col">Grade</th>
						      <th className="td-bold text-center" scope="col">Email</th>
						      <th className="td-bold text-center" scope="col">Phone</th>
						      <th className="td-bold text-center" scope="col">Dorm</th>
						    </tr>
						  </thead>
						  <RosterStudents filters={this.passFilters()} roster={this.props.roster} deleteRosterStudent={this.deleteRosterStudent} redirectOn={this.redirectOn} />
						</table>
						</Scrollbars>
			  		</div>
			  	</div>
			  </div>
			</div>
		)
	}
}

const mapStateToProps = (state,props) => {
	console.error(state)
	return {
		roster: state.firebase.data.rosters ?  state.firebase.data.rosters[props.params.id] : null,
	} 
};

const firebaseConnectProps = () =>{

}  

export default compose(
	 firebaseConnect((props)=>{
	 	console.log("The props",props)
	 	return [
    	'rosters/'+props.params.id,
  		]
	 })
,connect(mapStateToProps))(RosterDetails)