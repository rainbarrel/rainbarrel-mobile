import { Navigation } from 'react-native-navigation';
import { Provider } from 'react-redux';

import configureStore from '../../store';
import registerScreens from '../../screens';

import searchIcon from '../../images/icons/search.png';
import lovedOnesIcon from '../../images/icons/loved-ones.png';
import cameraIcon from '../../images/icons/camera.png';
import accountIcon from '../../images/icons/account.png';


const store = configureStore();
registerScreens(store, Provider);

export const startAuthScreen = () => {
  Navigation.startSingleScreenApp({
    screen: {
      screen: 'rbMobile.Login',
      navigatorStyle: {
        navBarHidden: true
      }
    }
  });
};

export const startApp = () => {
  Navigation.startTabBasedApp({
    tabs: [
      {
        label: 'search',
        title: 'Search',
        screen: 'rbMobile.Search',
        icon: searchIcon
      },
      {
        label: 'loved ones',
        title: 'Loved Ones',
        screen: 'rbMobile.LovedOnes',
        icon: lovedOnesIcon
      },
      {
        label: 'camera',
        title: 'Camera',
        screen: 'rbMobile.Camera',
        icon: cameraIcon
      },
      {
        label: 'account',
        title: 'Account',
        screen: 'rbMobile.Account',
        icon: accountIcon
      }
    ]
  });
};
