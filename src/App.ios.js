import React from 'react';
import Firebase from 'firebase';
import initFirebase from './initialization/firebase';
import { startAuth, startApp } from './initialization/app';

class App extends React.Component {
  static launchApp() {
    Firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        startApp();
      } else {
        startAuth();
      }
    });
  }

  static configureDev() {
    console.ignoredYellowBox = ['Remote debugger'];
  }

  constructor(props) {
    super(props);
    initFirebase();

    if (process.env.NODE_ENV === 'development') {
      App.configureDev();
    }

    App.launchApp();
  }
}

export default App;
