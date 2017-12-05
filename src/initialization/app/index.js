import { Navigation } from 'react-native-navigation';
import { Provider } from 'react-redux';

import configureStore from '../../store';
import registerScreens from '../../screens';

import searchIcon from '../../images/icons/search.png';
import lovedOnesIcon from '../../images/icons/loved-ones.png';
import raindropIcon from '../../images/icons/raindrop.png';
import accountIcon from '../../images/icons/account.png';


const store = configureStore();
registerScreens(store, Provider);

export const startAuthScreen = () => {
  Navigation.startSingleScreenApp({
    screen: {
      screen: 'RainbarrelMobile.Login',
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
        screen: 'RainbarrelMobile.SearchTab',
        icon: searchIcon
      },
      {
        label: 'loved ones',
        title: 'Loved Ones',
        screen: 'RainbarrelMobile.LovedOnesTab',
        icon: lovedOnesIcon
      },
      {
        label: 'raindrop',
        title: 'Raindrop',
        screen: 'RainbarrelMobile.RaindropTab',
        icon: raindropIcon
      },
      {
        label: 'account',
        title: 'Account',
        screen: 'RainbarrelMobile.AccountTab',
        icon: accountIcon
      }
    ]
  });
};
