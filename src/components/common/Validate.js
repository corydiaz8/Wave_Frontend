import {dateFormat} from './Dateformat.js'
//genereate messages for validation
//@param1 eventi generati on change 
//@param2 tipo del controllo in base al switch case
//@param3 experimental (not used)
const NowDate = new Date();

export function messagesValidate(event={},type,customvalue = false){
	const msg = {}
	var value 	= event.value;
	switch(type){

		case 'isEmpty':
			var isempty = false;
			if(Array.isArray(value)){

				if(value.length == 0){
					isempty = true;
				}else{
					isempty = false;
				}
			}else if(Number.isInteger(value)){

				isempty = false;

			}else{
				if (value == null) {
					isempty = true;

				}else{
					if(value.trim()==""){
						isempty = true;
					}else{
						isempty = false;
					}
				}

			}

			if(isempty){
				var txt_empty = "Il campo  in roso è obligatorio !";
				msg[event.name] = {error:1,classname:'parsley-error',message:txt_empty};

			}else{
				msg[event.name] = {classname:'',error:0,message:''};
			}

		break;

		case 'isEmail':

			if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
				var txt_email = "Email non valida";
				msg[event.name] = {error:1,classname:'parsley-error',message:txt_email};
	  		}else{
				msg[event.name] = {classname:'',error:0,message:''};
	  		}

		break;

		case 'isNumber':

			if(isNaN(Number(value))){

				var txt_number = "Devi inserire solo numeri!";
				msg[event.name] = {error:1,classname:'parsley-error',message:txt_number};
			}else{
				msg[event.name] = {classname:'',error:0,message:''};
			}

		break;

		case 'is6length':
			if(value.length < 6) {

				var txt_6length = "Devi inserire almeno 6 charateri";
				msg[event.name] = {error:1,classname:'parsley-error',message:txt_6length};

			}else{
				msg[event.name] = {classname:'',error:0,message:''};
			}

		break;

		case 'hasTipologia2':
		
			if(customvalue == 2 && value.trim() == "") {
				var txt_2tipo = "E obligatorio scegliere una agenzia";
				msg[event.name] = {error:1,classname:'parsley-error',message:txt_2tipo};
			}else{
				msg[event.name] = {classname:'',error:0,message:''};
			}


		break;

		case 'isPassword':
			var regexLower = /^(?=.*[a-z]).+$/;
			var regexUpper = /^(?=.*[A-Z]).+$/; 
			var regexSpecial = /^(?=.*[0-9_\W]).+$/; // Special character or number 
			var regexNumber  = /([0-9])/;
			if(value.length < 8) {
				//Devi inserire almeno 6 charateri 
				var txt_6length = "You must enter at least 8  characters";
				msg[event.name] = {error:1,classname:'parsley-error',message:txt_6length};
			}else if(!regexLower.test(value)){
				var txt_lower = "Must contains one lowercase characters";
				msg[event.name] = {error:1,classname:'parsley-error',message:txt_lower};

			}else if(!regexUpper.test(value)){
				var txt_upper = "Must contains one uppercase characters";
				msg[event.name] = {error:1,classname:'parsley-error',message:txt_upper};
			}else if(!regexNumber.test(value)){
				var txt_special = "Must contains one number";
				msg[event.name] = {error:1,classname:'parsley-error',message:txt_special};
			}else{
				msg[event.name] = {classname:'',error:0,message:''};
			}
		break;
		case 'isUrl':
			var regex =/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/; 

			if (!regex.test(value)) {
				var txt_url = "Url is not valid !";
				msg[event.name] = {error:1,classname:'parsley-error',message:txt_url};
	  		}else{
				msg[event.name] = {classname:'',error:0,message:''};
	  		}

		break;
		case 'compareWith':
			if(customvalue != value){
				var comparetxt = "Gli password non corrispondono!";
				msg[event.name] = {error:1,classname:'parsley-error',message:comparetxt};
			}else{
				msg[event.name] = {classname:'',error:0,message:''};
			}
		break;
		case 'compareCrop':

			if(value == customvalue ){
				var comparetxtcrop = "Prima di salvare devi tagliare l'immagine!";
				msg[event.name] = {error:1,classname:'parsley-error',message:comparetxtcrop};
			}else{
				msg[event.name] = {classname:'',error:0,message:''};
			}

		break;
		case 'nowDate':
			if( dateFormat(value) <= dateFormat(NowDate) ){
				var comparetxt = "La data di scedenza deve essere piu alta";
				msg[event.name] = {error:1,classname:'parsley-error',message:comparetxt};
			}else{
				msg[event.name] = {classname:'',error:0,message:''};
			}
		break;
		case 'codiceFiscale':
			if(ControllaCodiceFiscale(value) != ""){
				msg[event.name] = {error:1,classname:'parsley-error',message:ControllaCodiceFiscale(value)};
			}else{
				msg[event.name] = {classname:'',error:0,message:''};
			}
		break;

		case 'partitaIva':
			if(ControllaPIVA(value) != ""){
				msg[event.name] = {error:1,classname:'parsley-error',message:ControllaPIVA(value)};
			}else{
				msg[event.name] = {classname:'',error:0,message:''};
			}
		break;
		case 'specialKeys':
			var regn_a = /^([a-zA-Z\d']*)$/;
			var isemptys = false;

			if(Array.isArray(value)){

				if(value.length == 0){
					isemptys = true;
				}else{
					isemptys = false;
				}
			}else if(Number.isInteger(value)){

				isemptys = false;

			}else{
				if (value == null) {
					isemptys = true;

				}else{
					if(value.trim()==""){
						isemptys = true;
					}else{
						isemptys = false;
					}
				}

			}
			if(isemptys){

				msg[event.name] = {error:1,classname:'parsley-error',message:"Il campo  in roso è obligatorio !"};

			}else if(!regn_a.test(value)){
				msg[event.name] = {error:1,classname:'parsley-error',message:"Devi inserire solo valori numerici e charateri incluso apostrofo"};
			}else{
				msg[event.name] = {classname:'',error:0,message:''};
			}

		break;

		case 'isTelefono':
			var regTel= /^(\+39|0039){0,1}(0|3)([0-9]{7,10})$/;
			if(!regTel.test(value)){
				msg[event.name] = {error:1,classname:'parsley-error',message:"Numero di telefono non  è  valido"};
			}else{
				msg[event.name] = {classname:'',error:0,message:''};
			}
		break;

		case 'isCellulare':
			var regCell= /^(\+39|0039){0,1}(0|3)([0-9]{7,10})$/;
			if(!regCell.test(value)){
				msg[event.name] = {error:1,classname:'parsley-error',message:"Numero di cellulare non è  valido"};
			}else{
				msg[event.name] = {classname:'',error:0,message:''};
			}
		break;
	}


	return msg;
}

//MULTIPLES VALIDATE AT TIME
//@param1  arry obj-> func,field,valore state
//examples

    /*	var eventError = ValidateAll(
    				[
    					{'func'	:'isEmail','field':'nome','value':this.state.nome},
    					{'func'	:'is6length','field':'codice','value':this.state.codice},
    				]
    			); */

export function ValidateAll(event = new Array){
	const fields 	={};
	var render 		={};
	var errorsgenerate = [];
	var errors 		= 0;
	var disabled 	= false;

	event.map((arr,index)=>{		

					switch(arr.func){
						case 'isEmail':

							if(arr.value.trim() == ""){
								fields[arr.field] = messagesValidate({name:arr.field,value:arr.value},'isEmpty')[arr.field];
							}else{
								fields[arr.field] = messagesValidate({name:arr.field,value:arr.value},'isEmail')[arr.field];
							}
							
						break;
						case 'isTelefono':
							fields[arr.field] = messagesValidate({name:arr.field,value:arr.value},'isTelefono')[arr.field];
						break;
						case 'isCellulare':
							fields[arr.field] = messagesValidate({name:arr.field,value:arr.value},'isCellulare')[arr.field];
						break;
						case 'specialKeys':
							fields[arr.field] = messagesValidate({name:arr.field,value:arr.value},'specialKeys')[arr.field];
						break;
						case 'isNumber':
						
							arr.value = arr.value.toString()

							if(arr.value.trim()==""){
								fields[arr.field] = messagesValidate({name:arr.field,value:arr.value},'isEmpty')[arr.field];
							}else{
								fields[arr.field] = messagesValidate({name:arr.field,value:arr.value},'isNumber')[arr.field];
							}
							
						break
						case 'isNumberAllowEmpty':
							fields[arr.field] = messagesValidate({name:arr.field,value:arr.value},'isNumber')[arr.field];
						break;
						case 'isEmailAllowEmpty':
							fields[arr.field] = messagesValidate({name:arr.field,value:arr.value},'isEmail')[arr.field];
						break;
						case 'is6length':

							if(arr.value.trim()==""){
								fields[arr.field] = messagesValidate({name:arr.field,value:arr.value},'isEmpty')[arr.field];
							}else{
								fields[arr.field] = messagesValidate({name:arr.field,value:arr.value},'is6length')[arr.field];
							}
						
						break
						case 'isEmpty':

							fields[arr.field] = messagesValidate({name:arr.field,value:arr.value},'isEmpty')[arr.field];
							
						break
						case 'codiceFiscale':

							fields[arr.field] = messagesValidate({name:arr.field,value:arr.value},'codiceFiscale')[arr.field];
							
						break
						case 'partitaIva':

							fields[arr.field] = messagesValidate({name:arr.field,value:arr.value},'partitaIva')[arr.field];
							
						break
						case 'nowDate':

							if(arr.value == null){
								fields[arr.field] = messagesValidate({name:arr.field,value:arr.value},'isEmpty')[arr.field];
							}else{
								fields[arr.field] = messagesValidate({name:arr.field,value:arr.value},'nowDate')[arr.field];
							}
						
						break
						case 'hasTipologia2':

						var customvalue = -1;
						if(arr.customvalue){
							customvalue = arr.customvalue;
						}
						fields[arr.field] = messagesValidate({name:arr.field,value:arr.value},'hasTipologia2',customvalue)[arr.field];	
							
						break
						case 'isUrl':

							if(arr.value.trim()==""){
								fields[arr.field] = messagesValidate({name:arr.field,value:arr.value},'isEmpty')[arr.field];
							}else{
								fields[arr.field] = messagesValidate({name:arr.field,value:arr.value},'isUrl')[arr.field];
							}
						
						break
						case 'isPassword':

							if(arr.value.trim()==""){
								fields[arr.field] = messagesValidate({name:arr.field,value:arr.value},'isEmpty')[arr.field];
							}else{
								fields[arr.field] = messagesValidate({name:arr.field,value:arr.value},'isPassword')[arr.field];
							}
						
						break

						case 'compareCrop':
							var customvalueCr = '';
							if(arr.customvalue){
								customvalueCr = arr.customvalue;
							}

							fields[arr.field] = messagesValidate({name:arr.field,value:arr.value},'compareCrop',customvalueCr)[arr.field];
						break;

						case 'compareWith':
						
							if(arr.value.trim() == ""){
								fields[arr.field] = messagesValidate({name:arr.field,value:arr.value},'isEmpty')[arr.field];
							}else{
								var customvalue = '';
								if(arr.customvalue){
									customvalue = arr.customvalue;
								}
								fields[arr.field] = messagesValidate({name:arr.field,value:arr.value},'compareWith',customvalue)[arr.field];
							}
	
						break;
					}						

		errorsgenerate.push(fields[arr.field].error);			
	})

	if(errorsgenerate.includes(1)){
		errors = 1;
		disabled = true;
	}else{
		disabled = false;
		errors = 0;
	}

	errorsgenerate = [];

	return {
		fields,
		errors,
		disabled
	}
}


export function ValidateSingle(event = new Array){
	var fields 	={};
	var render 		={};
	var errorsgenerate = [];
	var errors 		= 0;
	var disabled 	= false;

	event.map((arr,index)=>{		
		if(arr.field == arr.single){
			switch(arr.func){
				case 'isEmail':

					if(arr.value.trim() == ""){
						fields[arr.field] = messagesValidate({name:arr.field,value:arr.value},'isEmpty')[arr.field];
					}else{
						fields[arr.field] = messagesValidate({name:arr.field,value:arr.value},'isEmail')[arr.field];
					}
					
				break;
				case 'specialKeys':
					fields[arr.field] = messagesValidate({name:arr.field,value:arr.value},'specialKeys')[arr.field];
				break;
				case 'isTelefono':
					fields[arr.field] = messagesValidate({name:arr.field,value:arr.value},'isTelefono')[arr.field];
				break;
				case 'isCellulare':
					fields[arr.field] = messagesValidate({name:arr.field,value:arr.value},'isCellulare')[arr.field];
				break;
				case 'isNumber':

					if(arr.value.trim()==""){
						fields[arr.field] = messagesValidate({name:arr.field,value:arr.value},'isEmpty')[arr.field];
					}else{
						fields[arr.field] = messagesValidate({name:arr.field,value:arr.value},'isNumber')[arr.field];
					}
					
				break
				case 'isNumberAllowEmpty':
					fields[arr.field] = messagesValidate({name:arr.field,value:arr.value},'isNumber')[arr.field];
				break;
				case 'isEmailAllowEmpty':
					fields[arr.field] = messagesValidate({name:arr.field,value:arr.value},'isEmail')[arr.field];
				break;
				case 'is6length':

					if(arr.value.trim()==""){
						fields[arr.field] = messagesValidate({name:arr.field,value:arr.value},'isEmpty')[arr.field];
					}else{
						fields[arr.field] = messagesValidate({name:arr.field,value:arr.value},'is6length')[arr.field];
					}
				
				break
				case 'isEmpty':

					fields[arr.field] = messagesValidate({name:arr.field,value:arr.value},'isEmpty')[arr.field];
					
				break
				case 'codiceFiscale':

					fields[arr.field] = messagesValidate({name:arr.field,value:arr.value},'codiceFiscale')[arr.field];
					
				break
				case 'partitaIva':

					fields[arr.field] = messagesValidate({name:arr.field,value:arr.value},'partitaIva')[arr.field];
					
				break
				case 'nowDate':
					if(arr.value == null){
						fields[arr.field] = messagesValidate({name:arr.field,value:arr.value},'isEmpty')[arr.field];
					}else{
						fields[arr.field] = messagesValidate({name:arr.field,value:arr.value},'nowDate')[arr.field];
					}
					
				break
				case 'isDate':

					fields[arr.field] = messagesValidate({name:arr.field,value:arr.value},'isDate')[arr.field];
					
				break
				case 'hasTipologia2':

				var customvalue = -1;
				if(arr.customvalue){
					customvalue = arr.customvalue;
				}
				fields[arr.field] = messagesValidate({name:arr.field,value:arr.value},'hasTipologia2',customvalue)[arr.field];	
					
				break
				case 'compareWith':
					if(arr.value.trim() == ""){
						fields[arr.field] = messagesValidate({name:arr.field,value:arr.value},'isEmpty')[arr.field];
					}else{
						var customvalue = '';
						if(arr.customvalue){
							customvalue = arr.customvalue;
						}
						fields[arr.field] = messagesValidate({name:arr.field,value:arr.value},'compareWith',customvalue)[arr.field];
					}
	
				break;
				case 'compareCrop':
					var customvalueCr = -1;
					if(arr.customvalue){
						customvalueCr = arr.customvalue;
					}
					fields[arr.field] = messagesValidate({name:arr.field,value:arr.value},'compareCrop',customvalueCr)[arr.field];
				break;
				case 'isPassword':

					if(arr.value.trim()==""){
						fields[arr.field] = messagesValidate({name:arr.field,value:arr.value},'isEmpty')[arr.field];
					}else{
						fields[arr.field] = messagesValidate({name:arr.field,value:arr.value},'isPassword')[arr.field];
					}
				
				break
				case 'isUrl':

					if(arr.value.trim()==""){
						fields[arr.field] = messagesValidate({name:arr.field,value:arr.value},'isEmpty')[arr.field];
					}else{
						fields[arr.field] = messagesValidate({name:arr.field,value:arr.value},'isUrl')[arr.field];
					}
				
				break
			}
			errorsgenerate.push(fields[arr.field].error);
	}

					
	})

	if(errorsgenerate.includes(1)){
		errors = 1;
		disabled = true;
	}else{
		disabled = false;
		errors = 0;
	}

	errorsgenerate = [];

	return {
		fields,
		errors,
		disabled
	}
}
export function ValidateServer(validations = {},states = {}){

	var fields 	= {};
	var disabled = true;
	fields = states;

	Object.keys(validations).map((index)=>{
		fields[index] = {error: validations[index].error ,classname:'parsley-error',message: validations[index].message};
	});

	return {
		fields,
		disabled
	}
}
//VALIDA A SINGLE VALUE RETURN  TRUE OR FALSE
//EXAMPLE
//@param1: il valore
//@param 2 : il tipo di controlo in base al switch case
/* valid(value,'isEmpty') */

export function valid(values,type){
	switch(type){
		case 'isEmpty':
			if(!values.trim()){
				return false;
			}else{
				return true;
			}

		break;

		case 'isEmail':

			if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values)) {
				return false;
	  		}else{
	  			return true;
	  		}

		break;

		case 'isNumber':

			if(isNaN(Number(values))){
				return false;
			}else{
				return true;
			}

		break;

		case 'is6length':
			if(values.length < 6) {
				return true;
			}else{
				return false;
			}


		break;

	}

}



export function ControllaPIVA(pi)
{
	var isempty = false;
	if(Array.isArray(pi)){

		if(pi.length == 0){
			isempty = true;
		}else{
			isempty = false;
		}
	}else if(Number.isInteger(pi)){

		isempty = false;

	}else{
		if (pi == null) {
			isempty = true;

		}else{
			if(pi.trim()==""){
				isempty = true;
			}else{
				isempty = false;
			}
		}

	}
	if(isempty){
		return "Il campo è obbligatorio";
	}

	if( pi == '' )  return '';
	if( ! /^[0-9]{11}$/.test(pi) )
		return "La partita IVA deve contenere 11 cifre.";
	var s = 0;
	for( i = 0; i <= 9; i += 2 )
		s += pi.charCodeAt(i) - '0'.charCodeAt(0);
	for(var i = 1; i <= 9; i += 2 ){
		var c = 2*( pi.charCodeAt(i) - '0'.charCodeAt(0) );
		if( c > 9 )  c = c - 9;
		s += c;
	}
	var atteso = ( 10 - s%10 )%10;
	if( atteso != pi.charCodeAt(10) - '0'.charCodeAt(0) )
		return "La partita IVA non è valida:\n" +
			"il codice di controllo non corrisponde.\n";
	return '';
}

export function ControllaCodiceFiscale(cf)
{
	var isempty = false;
	if(Array.isArray(cf)){

		if(cf.length == 0){
			isempty = true;
		}else{
			isempty = false;
		}
	}else if(Number.isInteger(cf)){

		isempty = false;

	}else{
		if (cf == null) {
			isempty = true;

		}else{
			if(cf.trim()==""){
				isempty = true;
			}else{
				isempty = false;
			}
		}

	}
	if(isempty){
		return "Il campo è obbligatorio";
	}
	cf = cf.toUpperCase();
	if( cf == '' )  return '';
	if( ! /^[0-9A-Z]{16}$/.test(cf) )
		return "Il codice fiscale deve contenere 16 tra lettere e cifre.";
	var map = [1, 0, 5, 7, 9, 13, 15, 17, 19, 21, 1, 0, 5, 7, 9, 13, 15, 17,
		19, 21, 2, 4, 18, 20, 11, 3, 6, 8, 12, 14, 16, 10, 22, 25, 24, 23];
	var s = 0;
	for(var i = 0; i < 15; i++){
		var c = cf.charCodeAt(i);
		if( c < 65 )
			c = c - 48;
		else
			c = c - 55;
		if( i % 2 == 0 )
			s += map[c];
		else
			s += c < 10? c : c - 10;
	}
	var atteso = String.fromCharCode(65 + s % 26);
	if( atteso != cf.charAt(15) )
		return "Il codice fiscale non è valido:\n" +
			"il codice di controllo non corrisponde.\n";
	return "";
}


