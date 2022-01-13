import React from 'react';

class Select2 extends React.Component {
	
	constructor(props) {
		super(props);
	}
	
	componentDidMount(){
		
		if( $('script[src="'+this.host()+'/js/select2/js/select2.min.js"]').length < 1){
			const script = document.createElement("script");
			script.src = "/js/select2/js/select2.min.js";
			script.async = true;
			document.body.appendChild(script);
		}
		
		let that = this;
		setTimeout(function(){
			that.renderSelect2(that.props);
		}, 500);
	}
	
	componentWillReceiveProps(nextProps){
		if( $('script[src="'+this.host()+'/js/select2/js/select2.min.js"]').length >= 1){
			
			if(this.props.options != null && typeof this.props.options !== 'undefined' && Object.keys(nextProps.options).length == Object.keys(this.props.options).length) return;
			this.renderSelect2(nextProps);
			
		}
	}
	
	renderSelect2(props){
		
		if(props.type == "descriptive"){
			$("#"+props.id).select2({
				placeholder:props.placeholder,
				data:props.options,
				templateResult: function(state) {
					if (!state.id) { return state.text; }
					var state = $(
					'<div><h5>' + state.aco + '</h5><i><small>'+state.description+'</small></i></div>'
					);
					return state;
				}
			});
			
		}else{
			
			var options = {};
			if(props.tags) options.tags = props.tags;
			if(props.ajax) options.ajax = props.ajax;
			if(props.minimumInputLength) options.minimumInputLength = props.minimumInputLength;
			$("#"+props.id).select2( options );
			
		}
		
		
		let thatprops = props;
		$("#"+props.id).on("change", function(event){
			thatprops.onChange(event);
		});
	}

	host(){
		if(window.location.hostname == "localhost"){
			return ""
		}else{

			return "/webapp"
		}
	}
	render() {
		console.log(this.props.options)
		return (
			<select 
				id = {this.props.id} 
				value={this.props.value} 
				name={this.props.name} 
				className={this.props.className}
				onChange={this.props.onChange}
				multiple={this.props.multiple ? "multiple" : false} 
				>
				{this.props.nullopt ? <option value="" >{this.props.nullopt}</option> : null }
				{this.props.type != "descriptive" ? (
                        this.props.options  && this.props.options instanceof Array?
                            this.props.options.map( (el, i) =>
								<option value={el.key} key={i} >{el.label}</option>
					): (this.props.options  && this.props.options instanceof Object ?
                                Object.keys(this.props.options).map( (key, i) =>
									<option value={key} key={i} >{this.props.options[key]}</option>
								) : null )
					) :null }
				
			</select>
		);
	}
}
export default Select2;
