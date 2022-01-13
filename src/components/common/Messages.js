import React from 'react';
import { connect } from 'react-redux'
import AlertContainer from 'react-alert';

/**********************************************
* <Messages  messages={this.props.messages} newalert={false}/>
* <Messages  messages={this.props.messages}/>
* 
***********************************************/
class Messages extends React.Component {
  	constructor(props) {
    	super(props);
    	this.alertOptions = {
	        offset: 14,
	        position: 'top right',
	        theme: 'dark',
	        time: 6000,
	        transition: 'scale'
    	};
    	this.time       = typeof this.props.time !=="undefined" ? this.props.time : this.alertOptions.time;
    	this._new_alert = typeof this.props.newalert !=="undefined" ? this.props.newalert : true;  //true new alert-react message or false alert old
  	}

  	showAlert(class_name,message){
	    try{//for secure renders error
	      this.msg.show(message, {
	        time: this.time,
	        type: 'success',
	        icon: <i className={class_name}></i>
	      });
	    }catch(e){
	      console.error("showAlert say ==> ",e)
	    }
 	}
  	newAlert(){
	    if( typeof this.props.messages != "undefined" ){
	        if(this.props.messages.success){
	            this.props.messages.success.map( (message, i) => this.showAlert('fa text-success fa-check',message) )
	            this.props.dispatch(this.clearMsg())  
	        }else if(this.props.messages.error){
	            this.props.messages.error.map( (message, i) => this.showAlert('fa text-error fa-times',message) )
	            this.props.dispatch(this.clearMsg())    
	        }else if(this.props.messages.info){
	            this.props.messages.info.map( (message, i) => this.showAlert('fa text-success fa-times',message) )
	            this.props.dispatch(this.clearMsg())    
	        }
	    }   
  	}
  	clearMsg(){
	    return (dispatch) => {
	      	dispatch({
	        	type: 'CLEAR_MESSAGES',
	      	});
	    }
  	}
  	render(){
    	this._new_alert==true ? this.newAlert() : null;
    	return this._new_alert ==true ? (<div><AlertContainer ref={(a) => this.msg = a} {...this.alertOptions} /></div>) :  null;
  	}

}

const mapStateToProps = (state) => {
  return {};
};

export default connect(mapStateToProps)(Messages);
