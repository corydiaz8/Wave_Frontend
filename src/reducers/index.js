import { createStore, combineReducers, compose } from 'redux'
import { reactReduxFirebase, firebaseReducer } from 'react-redux-firebase'
import global 		  from './global';
import messages 		from './messages';
import validate 		from './validate';

 
export default combineReducers({
  firebase: firebaseReducer,
  //firestore: firestoreReducer // <- needed if using firestore
  global,
  messages,
  validate,
});

