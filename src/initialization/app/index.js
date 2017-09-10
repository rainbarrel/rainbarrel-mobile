import { Navigation } from 'react-native-navigation';
import { Provider } from 'react-redux';

import configureStore from '../../store';
import registerScreens from '../../screens';
import icon from '../../images/icons/icon.png';


const store = configureStore();
registerScreens(store, Provider);

export const startAuthScreen = () => {
  Navigation.startSingleScreenApp({
    screen: {
      screen: 'rbMobile.Auth'
    }
  });
};

export const startApp = () => {
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
};
