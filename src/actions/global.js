import qs 	from 'qs'
import {generateLang} from './../components/common/Language';



export function logout() {
  
  return (dispatch) => {
    return fetch(window.url_prefix+'/login.php?logout=1', {
		method: 'GET',
		credentials: 'include',
		headers: new Headers({
		  'Content-Type': 'application/x-www-form-urlencoded', //'application/json' 
		})
    }).then((response) => {
		
      if (response.ok) {
        
        return response.json().then((json) => {
			dispatch({
				type: 'LOGIN_REDIRECT'
			});
        });
      } else {
		 
        return response.json().then((json) => {
			dispatch({
				type: 'ERROR_MESSAGES',
				messages: Array.isArray(json.messages) ? json.messages : [json.messages]
			});
		});
      }
    });
  };
  
}

export function nullRedirect() {
  
  return (dispatch) => {
   dispatch({
		type: 'NULL_REDIRECT'
	});
  };
  
}

export function getLookups(values) {
  
  return (dispatch) => {
    return fetch(window.url_prefix+'/lookups/get?'+qs.stringify(values), {
		method: 'GET',
		credentials: 'include',
		headers: new Headers({
		  'Content-Type': 'application/x-www-form-urlencoded', //'application/json' 
		})
    }).then((response) => {
		
      if (response.ok) {
        
        return response.json().then((json) => {
        	
			if( json.auth == false && json.redirect_url){
				
		        dispatch({
		            type: 'LOGIN_REDIRECT'
		        });

		    }else{
				dispatch({
					type: 'LOAD_LOOKUPS',
					lookups: json.data.lookups
				  });
			}
        });
        
      } else {
		
        return response.json().then((json) => {
          dispatch({
            type: 'LOGIN_REDIRECT'
          });
        });
      }
    });
  };
  
}
