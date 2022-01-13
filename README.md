## Wave Project school V 1.0

This is a project for Wave Schol, witha simple dashboard, where faculty and students can have access to it.

### Technologies
----------------
* [Npm && Node](https://www.npmjs.com/)
* [React Js 16.3.0](https://reactjs.org/)
* [Bootstrap 4](https://getbootstrap.com/docs/4.1/getting-started/introduction/)
* [Sass](https://sass-lang.com/)
* [Firebase](https://console.firebase.google.com)
* [Redux React Firebase](http://react-redux-firebase.com/)

----------------------

## Setup

`git clone  git@github.com:corydiaz8/Wave_Frontend.git`

Install the node_modules :

`npm install` 

Start the project locally:

`npm start` 

Deploy The project, All files will be compresed as static files to the folder  *build* and can be used:

`npm run build` 

----------------------

## Setup Firebase Credentials

If you are unfamiliar with firebase go to [Documentation Firebase](https://firebase.google.com/docs/web/setup).

Before use the app you must update the credentials on `src/store/configureStore.js` 


```js
	const firebaseConfig = {
	    apiKey: "AIzaSyDnv0LXNTTwCYH5v3IzjCHR6StSo3NoHZA",
	    authDomain: "wave-490b0.firebaseapp.com",
	    databaseURL: "https://wave-490b0.firebaseio.com",
	    projectId: "wave-490b0",
	    storageBucket: "wave-490b0.appspot.com",
	    messagingSenderId: "1030710416719"

	}
```



----------------------

This app use react scripts for build and deploy and if you want to configure your custom go to to `package.json`

```JSON
  "scripts": {
    "build-css": "node-sass-chokidar src/components/assets/dist/scss/style.scss -o src/components/assets/dist/css/",
    "start-js": "react-scripts start",
    "start": "npm-run-all -p watch-css start-js ",
    "watch-css": "npm run build-css && node-sass-chokidar src/components/assets/dist/scss/style.scss -o src/components/assets/dist/css/ --watch ",
    "build": "npm run build-css && react-scripts build",
    "test": "react-scripts test --env=jsdom",
    "eject": "react-scripts eject"
  },
```

-----------------------


Css custom files are stored to `src/components/dist/scss` and are deployed from sass to css to `src/components/dist/css` this is automatic with comand `npm start`


Thank You!