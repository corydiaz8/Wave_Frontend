export  function dateFormat(date,date_format='yyyy-mm-dd',time_want=false){
	
	var value_date,hour,min,sec,month,fulltime;
		value_date = new Date(date);
		if(value_date.getDate() < 10 ){
			date = '0' + value_date.getDate();
		}else{
			date = value_date.getDate();
		}
		 month = parseInt(value_date.getMonth()) + 1;
		if(month < 10 ){
			month = '0' + month;
		}else{
			month = value_date.getMonth();
			month = parseInt(month)+1;
		}
		if(time_want){
			if(value_date.getHours() < 10 ){
				hour = '0' + value_date.getHours();
			}else{
				hour = value_date.getHours();
			}

			if(value_date.getMinutes() < 10 ){
				min = '0' + value_date.getMinutes();
			}else{
				min = value_date.getMinutes();
			}

			if(value_date.getSeconds() < 10 ){
				sec = '0' + value_date.getSeconds();
			}else{
				sec = value_date.getSeconds();
			}
			fulltime = hour + ":" + min + ":" + sec;
			if(date_format=='yyyy-mm-dd'){
				value_date = value_date.getFullYear() + "-" + month + "-" + date +  " "  + fulltime;
			}else if(date_format =='yyyy/mm/dd'){
				value_date = value_date.getFullYear() + "/" + month + "/" + date +  " "  + fulltime;
			}
			
			
		}else{
			if(date_format=='yyyy-mm-dd'){
				value_date = value_date.getFullYear() + "-" + month + "-" + date;	
			}else if(date_format=='yyyy/mm/dd'){
				value_date = value_date.getFullYear() + "/" + month + "/" + date;	
			}
			
		}
		
	return value_date;
}

export function toDate(date = null){
	return new Date(date);
}

export function getTime(date = null){

	if(date){
		let instance = new Date();
		let hour,min,sec;
		let value_date = new Date(date);

		if(value_date.getHours() < 10 ){
			hour = '0' + value_date.getHours();
		}else{
			hour = value_date.getHours();
		}

		if(value_date.getMinutes() < 10 ){
			min = '0' + value_date.getMinutes();
		}else{
			min = value_date.getMinutes();
		}

		if(value_date.getSeconds() < 10 ){
			sec = '0' + value_date.getSeconds();
		}else{
			sec = value_date.getSeconds();
		}

		instance.setHours(hour);
		instance.setMinutes(min);
		return instance;

	}else{
		console.log("PLEASE INSERT A VALID DATE");
		return null;
	}
}


export function convertTime(original =  null ,modified = null){
	//aet time to date di pulicazione e fine publicazione
	if(original && modified){
		let instance = new Date(original);
		let hour,min,sec;
		let value_date = new Date(modified);

		if(value_date.getHours() < 10 ){
			hour = '0' + value_date.getHours();
		}else{
			hour = value_date.getHours();
		}

		if(value_date.getMinutes() < 10 ){
			min = '0' + value_date.getMinutes();
		}else{
			min = value_date.getMinutes();
		}

		if(value_date.getSeconds() < 10 ){
			sec = '0' + value_date.getSeconds();
		}else{
			sec = value_date.getSeconds();
		}

		instance.setHours(hour);
		instance.setMinutes(min);
		instance.setSeconds(sec);
		return instance;

	}else{
		console.log("PLEASE INSERT A VALID DATE");
		return null;
	}
}

export function dateJs2sql(datetime){
	
	return;
}

