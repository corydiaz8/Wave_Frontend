import React from 'react';
import Loading from 'react-loading';

class Load extends React.Component {
	type(){
		const{type} = this.props
		return type?type:'spokes'
	}
	color(){
		const{color} = this.props
		return color?color:'#11345e'		
	}
	getDivClass(){
		const{divClass} = this.props
		let cl = 'row pull-center m-t m-b' 
		return divClass ? cl + divClass : cl 
	}
	render() {
		const{ width,height } = this.props
		let w = width ? width : '64'
		let h = height ? height : '64'
		return (	
			<div className={this.getDivClass()}>
				<Loading type={this.type()} color={this.color()} width={w} height={h} delay={0} />
			</div>
		);
	}
}
export default Load;
