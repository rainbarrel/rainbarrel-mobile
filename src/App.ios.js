import React from 'react';
import { Navigation } from 'react-native-navigation';
import { Provider } from 'react-redux';

import firebaseInit from './firebase';
import configureStore from './store';
import registerScreens from './screens';
import icon from './images/icons/icon.png';


const store = configureStore();
registerScreens(store, Provider);

class App extends React.Component {
  static startApp() {
    Navigation.startTabBasedApp({
      tabs: [
        {
          label: 'First Tab',
          title: 'My First Tab',
          screen: 'rbMobile.Testing',
          icon
        }
      ]
    });
  }

  constructor(props) {
    super(props);
    firebaseInit();
    App.startApp();
  }
}

export default App;
