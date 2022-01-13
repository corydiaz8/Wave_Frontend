import React from 'react';

class FileManager extends React.Component {
	
	constructor(props) {
		super(props);
		
		window.filemanager = {

			afterSelectItem 		:null,
			beforeCreateImageUrl 	:null,
			beforeSelectItem 		:null,
			beforeCreatePreviewUrl 	:null,
			input 					:null,
			callback 				:null,
			inputName 				:null,
			params 					:null,
		}
	}
	componentDidMount(){

		window.filemanager.afterSelectItem 			= this.props.afterSelectItem 		? this.props.afterSelectItem 		: null 
		window.filemanager.beforeCreateImageUrl 	= this.props.beforeCreateImageUrl 	? this.props.beforeCreateImageUrl 	: null 
		window.filemanager.beforeSelectItem 		= this.props.beforeSelectItem 		? this.props.beforeSelectItem 		: null 
		window.filemanager.beforeCreatePreviewUrl 	= this.props.beforeCreatePreviewUrl ? this.props.beforeCreatePreviewUrl : null 
	}
	componentWillReceiveProps(nextProps){
		const {manager} = nextProps

		window.filemanager.input 		= manager.trigger 			? manager.trigger 		: null
		window.filemanager.callback 	= manager.selectCallback  	? manager.selectCallback : null
		window.filemanager.inputName 	= manager.inputName 		? manager.inputName : null
		window.filemanager.params 	    = manager.params 			? manager.params    : null
	}
	
	render() {
		const {manager} = this.props
		let configPath = manager.configFile ? "&config="+manager.configFile : "";
		
		return (	
			<div id="filemanager" className="modal fade"  role="dialog" style={{top:"0px"}}>
			  <div className="modal-dialog" style={{width:"95%"}}>
				<div className="modal-content">
				  <div className="modal-header bg-dark">
					<button type="button" className="close" data-dismiss="modal">&times;</button>
					<h5 className="modal-title"><i className="fa fa-folder-open text-success" ></i> Gestione media</h5>
				  </div>
				  <div className="modal-body" style={{height:"80vh"}} >
					{ manager.trigger ? 
						<iframe id={this.props.id ? this.props.id : "this-is-id"} src={window.host+"/media?langCode=it"+configPath} 
							style={{width:"100%", height:"100%", border: "none"}} scrolling="no" ></iframe> 
						: "" }
				  </div>
				  
				  <div className="modal-footer">
					<button type="button" className={"btn btn-default pull-right"} data-dismiss="modal">Chiudi</button>
				  </div>
				  
				</div>
			  </div>
			</div>
		);
	}
}
export default FileManager;


