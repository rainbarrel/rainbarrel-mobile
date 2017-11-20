import React from 'react';
import Firebase from 'firebase';
import firebaseInit from './initialization/firebase';
import { startAuthScreen, startApp } from './initialization/app';

class App extends React.Component {
  static launchApp() {
    console.ignoredYellowBox = ['Remote debugger'];

    Firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        startApp();
      } else {
        startAuthScreen();
      }
    });
  }

  constructor(props) {
    super(props);
    firebaseInit();
    App.launchApp();
  }
}

export default App;
