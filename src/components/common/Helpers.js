import {browserHistory} 	from 'react-router';
import React from 'react';
import Loading 				from 'react-loading';
import { getLang } 			from './Language.js'

/*****************TESTO BELLO PER GLI STATI*********************/
export const LOOKUP_STATUS= {
	pending:{
		name:"Pending",
		cl:"text-warning"
	},
	approved:{
		name:"Approved",
		cl:"text-success"
	},
	disapproved:{
		name:"Disapproved",
		cl:"text-danger"
	}
}

export const  Config = {

	players_lk:{
		'maggiore':"AmicoBlue",
		'herz':"Hertz",
		'locauto':'Locauto',
		'morini':'Morini',
	},
	defaultState:{}

};
export function fixDatePicker(themeDP = null){

	delete themeDP.slideRightEnter
	delete themeDP.slideRightLeave
	delete themeDP.slideRightEnterActive
	delete themeDP.slideRightLeaveActive
	delete themeDP.slideLeftEnter
	delete themeDP.slideLeftLeave
	delete themeDP.slideLeftEnterActive
	delete themeDP.slideLeftLeaveActive

	return  themeDP
}
export function btnActionLoading(){
	return(
		<div className=" pull-left " style={{marginRight:8}} >
			<Loading type='spin' color='#25313e' delay={0} height={13} width={13} />
		</div> 
	)
}
export function textClass(stato = null){

	if(stato != null){

		let cl;
		switch(stato){
			case 0: //Bozza
				cl = 'text-warning'
				break;
			case 1://In approvazione
				cl ='text-info'
				break;
			case 2://Non Approvato
				cl ='text-primary'
				break;
			case 3: //Approvato
				cl = 'text-success';
				break;
			case 9: //Deleted
				cl ='text-danger'
				break;

			default:
				cl ='text-success';
				break;
		}
		return cl;
	}else{
		return 'text-primary'
	}

}



export function capitalize(string) {
	if(string){
		return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
	}else return ('')
}
export function upperCase(string = null){
	if(string){
		return string.toUpperCase()
	}else{
		return '';
	}
}
export function	displayString(string,count = null){
	if(!string){
		return '';
	}

	if(count ==null ){
		count = 50;	
	}
	
	if(string.length > count){
		return	string = capitalize(string.substring(0,50) + '....')
	}else{
		return capitalize(string)
	}
}


export function formatMoney(nr, c, d, t){
var n = nr, 
    c = isNaN(c = Math.abs(c)) ? 2 : c, 
    d = d == undefined ? "." : d, 
    t = t == undefined ? "," : t, 
    s = n < 0 ? "-" : "", 
    i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c))), 
    j = (j = i.length) > 3 ? j % 3 : 0;
   return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
 };

export function redirectUrl(urls =null){

	if(urls){

		window.location.href = window.host + urls

	}
}

export function paginationText(data = null,txt_component = ""){
	if(data !=null){
		let current = data.results ? data.results.length : 0
		let totalRecords = data.paging.total? Number(data.paging.total) : 0
		let txt = "";
		txt = getLang('generic_list_pagination') + " " + parseInt(current) + " " + getLang('generic_list_pagination_da') + " " + parseInt(totalRecords)
		return (<small className="text-muted inline m-t-sm m-b-sm">{txt + " " +txt_component}</small>)

	}else return('');
	
	
}

export function recordSelected(txt,row){
	return <span className="pull-right text-info"> {row.length > 0 ? row.length  + " " + txt : "" }  </span>
}
export function noTableRows(colSpan){
		let colspan = 1
		if(colSpan){
			colspan = colSpan
		}
		return <tr key={1*10} className="text-center" ><td colSpan={colspan}>  {getLang('generic_no_tr_record')} </td> </tr>
}

export function warningTitolo(st){
	if(st.length > 100){
		return (<span className="text-warning"> Si suggerisce un titolo meno di 100 caratteri per leggibilità e SEO  </span>)
	}else return (null)
}

export function r(){
 let mvar;	
 let r;
 let re;
}

export function selectElemText(elem) {

    //Create a range (a range is a like the selection but invisible)
    var range = document.createRange();

    // Select the entire contents of the element
    range.selectNodeContents(elem);

    // Don't select, just positioning caret:
    // In front 
    // range.collapse();
    // Behind:
    // range.collapse(false);

    // Get the selection object
    var selection = window.getSelection();

    // Remove any current selections
    selection.removeAllRanges();

    // Make the range you have just created the visible selection
    selection.addRange(range);

}

export function empty(v, trim=false){
	/*
	 * Il valore "0"(zero) NON e un empty (Diverso da PHP)
	 * */
	
	if(v instanceof Array && v.length == 0){
		return true;
	}else if(v instanceof Array && v.length > 0){
		return false;
	}
	
	if(trim && typeof v== 'string' ){
		v = v.trim();
	}
	if(typeof v == 'undefined' || v==null || v=="" ){
		return true;
	}
	return false;
}
