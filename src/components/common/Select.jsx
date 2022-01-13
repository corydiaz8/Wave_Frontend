import React from 'react';

class Select extends React.Component {
	
	constructor(props) {
		super(props);
	}
	
	render() {
		
		return (
			<select 
				value={this.props.value ? this.props.value : ""} 
				name={this.props.name} 
				className={this.props.className}
				onChange={this.props.onChange} 
				multiple={this.props.multiple ? "multiple" : false} 
				size={this.props.size ? this.props.size : false} 
				>
				
				{this.props.nullopt ? <option value="" >{this.props.nullopt}</option> : null }
				{this.props.options  && this.props.options instanceof Array ?
					this.props.options.map( (el, i) =>
						typeof el == 'string' || typeof el == 'numeric' ? <option value={i} key={i}>{el}</option> : <option value={el.key} key={i}>{el.label}</option>
				): (this.props.options  && this.props.options instanceof Object ?
					Object.keys(this.props.options).map( (key, i) =>
						<option value={key} key={i} >{this.props.options[key]}</option>
				) : null )}
			</select>
		);
	}
}
export default Select;



