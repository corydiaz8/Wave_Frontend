import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'
import browserHistory from 'history/createBrowserHistory'
import Loading 		from 'react-loading';

class RosterStudentsNew extends React.Component{
	constructor(props){
		super(props)
		this.state={students:[]}
		this.handleChangeBox = this.handleChangeBox.bind(this)
	}
	handleChangeBox(rowS,event){
		let row 	= event.target.getAttribute('data-rowkey');

		this.setState((prevState,props)=>{
			if(prevState.students.indexOf(row) != -1 ){
				prevState.students.splice(prevState.students.indexOf(row),1);	
			}else{
				prevState.students.push(row);
			}
			let newState = {
				students:prevState.students,
			}
			this.props.handleChangeBox(prevState.students,event)
			return newState
		})


	}
	redirectOn(id,e){
		this.props.redirectOn(id)
	}
	componentDidMount(){
		this.setState({students:this.props.stateStudents})
	}
	componentWillReceiveProps(nextProps){
		if(nextProps.stateStudents){
			this.setState({students:nextProps.stateStudents})
		}
	}
	renderStudents(){
		const{ students,isLoaded,rosters } = this.props

		if(!students || !rosters){
			return <tbody><tr><td colSpan="6"> <div className="text-center loading"><Loading type='spin' color='#457eb5' delay={0}  /></div></td></tr></tbody>
		}
		
		let studentsRosters = []

		Object.keys(students).map((row,k)=>{
			if(this.props.params.id){
				if( rosters.students.includes(row) ){
					students[row]['id'] = row
					studentsRosters.push(students[row])
				}
			}else{
				students[row]['id'] = row
				studentsRosters.push(students[row])
			}

		})

		if(studentsRosters.length == 0){
			return <tr><td colSpan={6}>{"No results"}</td></tr>
		}

		const studentsList = ()=>{
			return Object.keys(students).map((row,k)=>
				  	<tr className="cursor-pointer" key={k}>
				  		<td><input type="checkbox" data-rowkey={row} checked={this.state.students.includes(row) ? true : false} onChange={(e)=>this.handleChangeBox(row,e)}  /></td>
				      	<td  data-rowkey={row} onClick={(e)=>this.handleChangeBox(row,e)} >{students[row].first_name}</td>
				       	<td  data-rowkey={row} onClick={(e)=>this.handleChangeBox(row,e)}>{students[row].last_name}</td>
				       	<td  data-rowkey={row} onClick={(e)=>this.handleChangeBox(row,e)}>{students[row].grade}</td>
				       	<td  data-rowkey={row} onClick={(e)=>this.handleChangeBox(row,e)}>{students[row].gender}</td>
				       	<td  data-rowkey={row} onClick={(e)=>this.handleChangeBox(row,e)}>{students[row].current_location}</td>
				       	<td  data-rowkey={row} onClick={(e)=>this.handleChangeBox(row,e)}>{students[row].dorm}</td>
					</tr>
			)
		}

		return( <tbody> {studentsList()} </tbody>)
	}

	render(){
		console.log(this.state)
		return  this.renderStudents()
		
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
	   		'students'+fname,
	   		
	  	]
	 })
,connect(mapStateToProps))(RosterStudentsNew)