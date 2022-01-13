import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'
 

class Index extends React.Component{
	constructor(props){
		super(props)
		this.state = {}
		this.handleAdd = this.handleAdd.bind(this)
	}
	componentDidMount(){
		console.log("componentDidMount",this.props.authors)
	}
	componentWillReceiveProps(nextProps){

		if(nextProps.authors){
			this.setState({authors:nextProps.authors})
		}
		
	}
	handleAdd(event){
		event.preventClick
		const {firebase} = this.props
		firebase.push('authors', { name: 'Klevis Cipi', done: 12 })
	}
	render(){
		console.log("The ptrops",this.props)
		const authors = (row,key) => {
			return <span className="label label-danger" key={key} > { row.name } </span>
		}
		return(
			  <div className="content">

			    <h1>Test page</h1>
			    	{ this.state.authors ? 
			    		Object.keys(this.state.authors).map((row,key)=>
			    			authors(this.state.authors[row],key)
			    		)
			    		:(null)
			    	}

			    <button onClick={this.handleAdd} className="btn btn-success">Add</button>
			  </div>
		)
	}
}

const mapStateToProps = (state) => {
	return {authors:state.firebase.data.authors};
};

const firebaseConnectProps = () =>{

}  

export default compose(
	 firebaseConnect([
    'authors'
  	])
,connect(mapStateToProps))(Index)