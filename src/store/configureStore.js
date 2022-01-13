import { applyMiddleware, compose, createStore } from 'redux'
import thunk from 'redux-thunk'
import promise from 'redux-promise';
import { createLogger } from 'redux-logger'
import rootReducer from '../reducers'
import { reactReduxFirebase, firebaseReducer } from 'react-redux-firebase'
import firebase from 'firebase'


// initialize firestore
// firebase.firestore() // <- needed if using firestore
export default function configureStore(initialState) {

const firebaseConfig = {

    apiKey: "AIzaSyDnv0LXNTTwCYH5v3IzjCHR6StSo3NoHZA",
    authDomain: "wave-490b0.firebaseapp.com",
    databaseURL: "https://wave-490b0.firebaseio.com",
    projectId: "wave-490b0",
    storageBucket: "wave-490b0.appspot.com",
    messagingSenderId: "1030710416719"

}
 
// react-redux-firebase config
const rrfConfig = {
  userProfile: 'users',
  // useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
}
 
// initialize firebase instance
firebase.initializeApp(firebaseConfig)

  const logger = createLogger();
  // Add reactReduxFirebase enhancer when making store creator
  const createStoreWithFirebase = compose(
    reactReduxFirebase(firebase, rrfConfig), // firebase instance as first argument
    // reduxFirestore(firebase) // <- needed if using firestore
  )(createStore)
  
  const store = createStoreWithFirebase(rootReducer,initialState, applyMiddleware(thunk, promise, logger))
   
  if (module.hot) {
    console.log("The hot")
    // Enable hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers');
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}


