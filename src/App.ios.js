import React from 'react';
import { Navigation } from 'react-native-navigation';
import { Provider } from 'react-redux';
import Firebase from 'firebase';

import configureStore from './store';
import registerScreens from './screens';


const store = configureStore();
registerScreens(store, Provider);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.startApp();
  }

  componentWillMount() {
    const config = {
      apiKey: 'AIzaSyC2d9VA15vv6f9V4R3c2biw7oXUSERP8S4',
      authDomain: 'rainbarrel-b1575.firebaseapp.com',
      databaseURL: 'https://rainbarrel-b1575.firebaseio.com',
      projectId: 'rainbarrel-b1575',
      storageBucket: 'rainbarrel-b1575.appspot.com',
      messagingSenderId: '212513060145'
    };

    Firebase.initializeApp(config);
  }

  startApp() {
    Navigation.startTabBasedApp({
      tabs: [
        {
          label: 'First Tab',
          title: 'My First Tab',
          screen: 'rbMobile.Testing',
          icon: require('./images/icons/icon.png')
        }
      ]
    });
  }
}

export default App;
