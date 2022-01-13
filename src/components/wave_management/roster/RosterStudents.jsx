import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'
import browserHistory from 'history/createBrowserHistory'
import Loading 		from 'react-loading';

class RosterStudents extends React.Component{
	constructor(props){
		super(props)
	}

	redirectOn(id,e){
		this.props.redirectOn(id)
	}
	renderRostersDetails(){
		const{ roster,students,params } = this.props
		if(!roster || !students){

			return <tbody><tr><td colSpan="6"><div className="text-center loading"><Loading type='spin' color='#457eb5' delay={0}  /></div></td></tr></tbody>
		}

		if(!roster.students){
			return <tr><td colSpan={6}>{"No results"}</td></tr>
		}
		let studentsRosters = []

		Object.keys(students).map((row,k)=>{
			if( roster.students.includes(row) ){
				students[row]['id'] = row
				studentsRosters.push(students[row])
			}
		})

		if(studentsRosters.length == 0){
			return <tr><td colSpan={6}>{"No results"}</td> </tr>
		}

		const rosterListD = ()=>{
			return studentsRosters.map((row,k)=>

				 <tr key={k}>
			      	<td>{row.first_name}</td>
			       	<td>{row.last_name}</td>
			       	<td>{row.grade}</td>
			       	<td>{row.gender}</td>
			       	<td>{row.current_location}</td>
			       	<td>{row.dorm}</td>
			       	<td><a onClick={(e)=>this.props.deleteRosterStudent(row.id,e)}> <i className="fa fa-trash my-fa"></i> </a></td>
			    </tr>
			)
		}
		return(<tbody>{rosterListD()}</tbody>)
	}
	render(){
		return  this.renderRostersDetails()
		
	}
}

const mapStateToProps = (state) => {
	return {students:state.firebase.data.students?state.firebase.data.students:{},
	};
};

const firebaseConnectProps = () =>{

}  

export default compose(
	 firebaseConnect((state,props)=>{
	 	let fname = state.filters.first_name?'#'+state.filters.first_name:""
	 	return [
	   		'students'+fname
	  	]
	 })
,connect(mapStateToProps))(RosterStudents)