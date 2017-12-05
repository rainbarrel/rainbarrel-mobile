import React from 'react';
import Firebase from 'firebase';
import initFirebase from './initialization/firebase';
import { startAuthScreen, startApp } from './initialization/app';

class App extends React.Component {
  static launchApp() {
    if (process.env.NODE_ENV === 'development') {
      App.configureDev();
    }

    Firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        startApp();
      } else {
        startAuthScreen();
      }
    });
  }

  static configureDev() {
    console.ignoredYellowBox = ['Remote debugger'];
  }

  constructor(props) {
    super(props);
    initFirebase();
    App.launchApp();
  }
}

export default App;
