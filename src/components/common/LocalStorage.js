export function setLocalStorage(obj_name = null,values = null){

	if(obj_name !=null){
		localStorage.setItem(obj_name, JSON.stringify(values));
	}else{
		console.log("Per Favore inserisci un nome all oggetto che voi salvare storage")
	}
}

export function getLocalStorage(obj_name= null){

	if (obj_name != null) {
		return JSON.parse(localStorage.getItem(obj_name))	
	}else{
		console.log("Per Favore inserisci il nome dell oggetto salvato su storage")
	}
	
}

export function hasLocalStorage(){
	/*CONTROLLIAMO SE BROSWER SUPPORT LOCAL STORAGE*/
	
	if(window.localStorage){
		return true;
	}else{
		return false;
	}
}