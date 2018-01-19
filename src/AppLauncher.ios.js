import React from 'react';
import Firebase from 'firebase';
import initFirebase from './initialization/firebase';
import { startAuth, startApp } from './initialization/app';

class AppLauncher extends React.Component {
  static launch() {
    Firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        startApp();
      } else {
        startAuth();
      }
    });
  }

  constructor(props) {
    super(props);
    initFirebase();

    if (process.env.NODE_ENV === 'development') {
      console.ignoredYellowBox = ['Remote debugger'];
    }

    AppLauncher.launch();
  }
}

export default AppLauncher;
