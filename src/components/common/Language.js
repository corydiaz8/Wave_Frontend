import {setLocalStorage,getLocalStorage,hasLocalStorage} from  './LocalStorage';

export function generateLang(obj = {}){
	let language = {
		it:{},
		en:{}
	};
	
	if(obj.hasOwnProperty('it')){
		Object.keys(obj['it']).map((val_i)=>{
			language.it[obj['it'][val_i]['code']] = obj['it'][val_i]['value']
		})	

	}else{

		console.log("Errore!,Per Favore Contatta Amministrazione")
	}

	if(obj.hasOwnProperty('en')){
		Object.keys(obj['en']).map((val_i)=>{
			language.en[obj['en'][val_i]['code']] = obj['en'][val_i]['value']
		})
	}else{
		console.log("Errore!,Per Favore Contatta Amministrazione")
	}

	if(hasLocalStorage()){

		if(getLocalStorage('language')){
			if( Object.keys(getLocalStorage('language')[getLocalStorage('lng_instance')]).length <  Object.keys(obj[getLocalStorage('lng_instance')]).length ){

				setLocalStorage('language',language)
			}
		}else{
			setLocalStorage('language',language)
		}
	}else{
		//broswer no support localStorage
		/** SALVIAMO LANGUAGE SU WINDOW**/
		window.globalconf.language.it =  obj['it'];
		window.globalconf.language.en =  obj['en'];
	}
	//inseriamo comunque instance della lingua si window
	if( hasLocalStorage() ){
		if(!getLocalStorage('lng_instance')){

			setLocalStorage('lng_instance','it')
		}
	}

}

export function instanceLanguage(thelang){
	if(typeof thelang !== "undefined" ){
		console.log("THE LANG",thelang)
		if( hasLocalStorage() ) {

			setLocalStorage('lng_instance',thelang)
		}

		window.globalconf.language.instance = thelang; //la default

	}
}

export function getInstance(){
	let instance = 'it';

	if(hasLocalStorage()){

		instance = getLocalStorage('lng_instance')

	}else{
		instance = window.globalconf.language.instance;
	}

	return instance;
}

export function getLang(code,win_lng = false){
	let value_return = '';
	let instance = 'it'; //default instance
	

	if(typeof getInstance() !=="undefined"){

		instance = getInstance();
	}else{
		console.log('Instanca non configurata')
	}

	if(hasLocalStorage()){

		if(getLocalStorage('language')){

			let lng = getLocalStorage('language');

			if(lng.hasOwnProperty(instance)){

				if(lng[instance].hasOwnProperty(code)){

					value_return = lng[instance][code];

				}else{
					value_return = "Codice Sbagliato!!!"
				}				
			}else{
				console.log("Global storage non e stato configurato, per favore contatta l'amministrazione")
			}

		}else{
			console.log("Global storage non e stato configurato, per favore contatta l'amministrazione")
		}

	}else{
		let lng_window = window.globalconf.language;
		
		if(typeof window.globalconf !=="undefined"){
			
			if(typeof window.globalconf !=="undefined"){

				if(lng_window.hasOwnProperty(instance)){

					if(lng_window[instance].hasOwnProperty(code)){

						value_return = lng_window[instance][code];

					}else{
						value_return = "Codice Sbagliato!!!"
					}
				}else{
					console.log("Globalconf non esiste per favore contatta l'amministrazione")
				}
			}else{
				console.log("Globalconf non esiste per favore contatta l'amministrazione")
			}
		}else{
			console.log("Globalconf non esiste per favore contatta l'amministrazione")
		}

	}

	return value_return
}


