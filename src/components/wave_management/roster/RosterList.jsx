import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'
import  Scrollbars  from 'react-scrollbar';

class Search extends React.Component{
	constructor(props){
		super(props)
		this.state = {}
		this.redirectOnNew = this.redirectOnNew.bind(this)
	}
	componentDidMount(){
	}
	componentWillReceiveProps(nextProps){

	}
	redirectOn(id){
		this.props.router.push('rosterdetails/'+id)
	}
	redirectOnNew(){
		this.props.router.push('newroster')
	}
	renderRosters(){
		const{ rosters } = this.props
		if(!rosters){
			return null
		}
		const rosterList = ()=>{
			return Object.keys(rosters).map((row,k)=>
				  	<tr className="cursor-pointer" onClick={(e)=>this.redirectOn(row)} key={k}>
				  		<td>{rosters[row]?rosters[row].title:""}</td>
				  		<td>{rosters[row]?rosters[row].students?rosters[row].students.length:0:0}</td>
					</tr>
			)
		}
		return( <tbody>{rosterList()}</tbody>)
	}
	render(){

		return(
			<div className="card m-top-default">
			 <h5 className="card-title">Roster</h5>
			  <div className="card-body text-center">
			  	<div className="row">
			  		<div className="col-lg-12">
					    <div className="row">
					    	<div className="col-lg-12">
					    		<div className="float-right">
					    			<button onClick={this.redirectOnNew}  className="btn btn-md bg-principal b-round p-l-r" type="button">Add New Roster</button>
					    		</div>
					    	</div>
					    </div>
			  			<br/>
			  			<Scrollbars speed={1} className="area-table-scroll" horizontal={false} vertical={true} >
							<table className="table ">
							  <thead>
							    <tr>
							      <th className="td-bold text-center" scope="col">Name</th>
							      <th className="td-bold text-center " scope="col"># of Members</th>
							    </tr>
							  </thead>
							 {this.renderRosters()}
							</table>
						</Scrollbars>
			  		</div>
			  	</div>
			  </div>
			</div>
		)
	}
}

const mapStateToProps = (state) => {

	return {rosters:state.firebase.data.rosters};
};

const firebaseConnectProps = () =>{

}  

export default compose(
	 firebaseConnect([
    'rosters' // { path: '/todos' } // object notation
  	])
,connect(mapStateToProps))(Search)