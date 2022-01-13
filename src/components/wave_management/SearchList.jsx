import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'
import browserHistory from 'history/createBrowserHistory'
import Loading 		from 'react-loading';

class SearchList extends React.Component{
	constructor(props){
		super(props)
	}

	redirectOn(id,e){
		this.props.redirectOn(id)
	}
	renderStudentsRound(){

		const{ students,firebase } = this.props

		if(!students){
			return <tr><td colSpan="6"> <div className="text-center">No results </div></td></tr>

		}
		const showl=(loc)=>{
			return loc=="off"?"text-danger":"text-success"
		}
		const studentsList = ()=>{
			return Object.keys(students).map((row,k)=>
				<div className="col-lg-3 col-xs-12 col-sm-6 col-md-6 cursor-pointer" key={k}  onClick={(e)=>this.redirectOn(row,e)}>
		            <img className="rounded-circle search-img" src={students[row].profile_picture} alt="Generic placeholder image" />
		            <h3>{students[row].first_name + " " + students[row].last_name} </h3>
		            <p>{students[row].grade+"th " + "Grade"}</p>
		            <p>{students[row].current_location + " . "}  <span className={showl(students[row].currentLocation_type)}> {students[row].currentLocation_type }</span></p>
		          </div>
			)
		}
		return(studentsList())
	}
	renderStudents(){
		const{ students,firebase } = this.props

		if(!students){
			return <tr><td colSpan="6"> <div className="text-center">No results </div></td></tr>

		}

		const studentsList = ()=>{
			return Object.keys(students).map((row,k)=>
				  	<tr className="cursor-pointer"  onClick={(e)=>this.redirectOn(row,e)} key={k}>
				      	<td>{students[row].first_name}</td>
				       	<td>{students[row].last_name}</td>
				       	<td>{students[row].grade}</td>
				       	<td>{students[row].gender}</td>
				       	<td>{students[row].current_location}</td>
				       	<td>{students[row].dorm}</td>
					</tr>
			)
		}
		return( <tbody>{studentsList()}</tbody>)
	}
	render(){
		return this.props.list=="list" ? this.renderStudentsRound() : this.renderStudents()
		
	}
}

const mapStateToProps = (state) => {
	return {
		students:state.firebase.data.students,
	};
};

const firebaseConnectProps = () =>{

}  

export default compose(
	firebaseConnect((state,props)=>{
		let fil = state.filters ? "#"+state.filters : ""
	 	return [
	   	'students'+fil
	  	]
	})
,connect(mapStateToProps))(SearchList)