import { Navigation } from 'react-native-navigation';
import Login from '../components/auth/Login';
import Signup from '../components/auth/Signup';

import {
  SearchTab,
  LovedOnesTab,
  RaindropTab,
  AccountTab
} from '../components/top-level-tabs';

const registerScreens = (store, Provider) => {
  // auth
  Navigation.registerComponent('rbMobile.Login', () => Login, store, Provider);
  Navigation.registerComponent('rbMobile.Signup', () => Signup, store, Provider);

  // top-level tabs
  Navigation.registerComponent('rbMobile.SearchTab', () => SearchTab, store, Provider);
  Navigation.registerComponent('rbMobile.LovedOnesTab', () => LovedOnesTab, store, Provider);
  Navigation.registerComponent('rbMobile.RaindropTab', () => RaindropTab, store, Provider);
  Navigation.registerComponent('rbMobile.AccountTab', () => AccountTab, store, Provider);
};

export default registerScreens;
