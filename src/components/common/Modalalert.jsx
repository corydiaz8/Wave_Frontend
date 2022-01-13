import React from 'react';

/***********
saveid => e l'id che servira dopo la conferm, delete ediet ect ect
modalid =>id modal per il pop up di setstesso
title  => modal title header;
titlecancel   =>title buttone per non conferma
titleconfirm = >title del button per la conferma

Attenzione:
saveid e modalid sono obbligatori
meentri title,titlecancel e titleconfirm hano un valore di default
example
<button type="button" className="btn btn-info btn-xs" data-toggle="modal" data-target="#mymodal-id">Open Modal</button>
<Modalalert text="Sei sicuro" title="Test Title" modalid='mymodal-id' saveid="thisid" titlecancel="Cancella"/>
************/
class Modalalert extends React.Component {
	
	constructor(props) {
		super(props);
		this.onConfirm 	= this.onConfirm.bind(this)
		this.closeModal = this.closeModal.bind(this)
	}
	closeModal(e){
		if(this.props.dismis == false){
			$("#"+this.props.modalid).modal('hide')
		}
		if(this.props.onCancel){
			this.props.onCancel(e)
		}
	}
	onConfirm(e){
		if(this.props.dismis == false){
			this.closeModal(e)
		}
		this.props.onConfirm(e)
	}
	render() {
		var styles = {
		  view:{
		    display: "none"
		  },
		  btn:{
		  	marginRight:'8px'
		  }
		};
		var title 			= "Warning";
		var modalid 		= 'noid-modal';
		var titlecancel 	= "No";
	    var titleconfirm 	= "SI";
		var disabled;
		var saveid;
		var classcancel 	= "btn btn-sm btn-dark";
		var classconfirm 	= "btn btn-sm btn-danger";
		var dismis 			= "modal";

		title 			= typeof this.props.title  			== 	"undefined" ? title :  this.props.title;
		modalid 		= typeof this.props.modalid 		== 	"undefined" ? modalid : this.props.modalid;
		titlecancel 	= typeof this.props.titlecancel 	==  "undefined" ? titlecancel : this.props.titlecancel;
		titleconfirm    = typeof this.props.titleconfirm 	== 	"undefined" ? titleconfirm : this.props.titleconfirm;
		classcancel 	= typeof this.props.classcancel 	== 	"undefined" ? classcancel : this.props.classcancel;
		classconfirm 	= typeof this.props.classconfirm 	== 	"undefined" ? classconfirm : this.props.classconfirm;
		dismis 			= typeof this.props.dismis 			== 	"undefined" ? dismis : this.props.dismis == false ? "" : dismis;


		if(typeof this.props.saveid =="undefined"){
			saveid  = 'noid';
			disabled = "disabled";			
		}else{
			saveid  = this.props.saveid;
			disabled = false;
		}

		return (	
			<div id={this.props.modalid} className="modal fade"  role="dialog">
			  <div className="modal-dialog">
			    <div className="modal-content">
			      <div className="modal-header bg-danger">
			        <button type="button" className="close" data-dismiss="modal">&times;</button>
			        <h5 className="modal-title"> <i className='fa fa-warning'></i>   {title}</h5>
			      </div>
			      <div className="modal-body">
			      	{this.props.text}
				  </div>
				  
				  <div className="modal-footer">
			      	<button type="button" className={ classcancel + " pull-right"} data-dismiss={dismis} onClick={this.closeModal}>{titlecancel}</button>
			        <button 
			        		id={saveid} 
			        		disabled={disabled} 
			        		onClick={ this.onConfirm } 
			        		data-save="save" 
			        		type="button" 
			        		style={styles.btn} 
			        		className={ classconfirm + " pull-right"} 
			        		data-dismiss={dismis}
			        >
			        {titleconfirm}
			        </button>
			      </div>
			      
			    </div>

			  </div>
			</div>
		);
	}
}
export default Modalalert;
