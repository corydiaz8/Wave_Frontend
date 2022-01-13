export default function global(state = {}, action) {
  switch (action.type) {
    case 'GET_SESSION':
		return Object.assign({}, state, {
			session: action.session,
			loadingApp: false,
			login_redirect: false
		});
	break;
    case 'CLEAR_SESSION':
		return Object.assign({}, state, {
			session: false,
		});
	break;
	case 'LOGIN_REDIRECT':
		return Object.assign({}, state, {
			login_redirect:true,
			login_success_redirect:false
		});
	break;
	
	case 'REDIRECT':
		return Object.assign({}, state, {
			redirect_url:action.redirect_url,
		});
	break;
	
	case 'NULL_REDIRECT':
		return Object.assign({}, state, {
			redirect_url:null,
		});
	break;
	
	case 'LOGIN_SUCCESS_REDIRECT':
		return Object.assign({}, state, {
			login_redirect:false,
			login_success_redirect:true
		});
	break;
	
	case 'LOAD_LOOKUPS':
		return Object.assign({}, state, {
			lookups:action.lookups,
		});
	break;
	
	case 'LOADING_CLEAR_CACHE':
		return Object.assign({}, state, {
			loading_cache:true,
		});
	break;
	
	case 'END_LOADING_CLEAR_CACHE':
		return Object.assign({}, state, {
			loading_cache:false,
		});
	break;
	case 'SET_LANGUAGE':
		return Object.assign({}, state, {
			lng_instance: action.lng_instance,
		});
	break;
	case 'SEARCH':
		return Object.assign({}, state, {
			search:true,
		});
	break;		
    default:
		return state;
  }
}
