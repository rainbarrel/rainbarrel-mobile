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
  Navigation.registerComponent('RainbarrelMobile.Login', () => Login, store, Provider);
  Navigation.registerComponent('RainbarrelMobile.Signup', () => Signup, store, Provider);

  // top-level tabs
  Navigation.registerComponent('RainbarrelMobile.SearchTab', () => SearchTab, store, Provider);
  Navigation.registerComponent('RainbarrelMobile.LovedOnesTab', () => LovedOnesTab, store, Provider);
  Navigation.registerComponent('RainbarrelMobile.RaindropTab', () => RaindropTab, store, Provider);
  Navigation.registerComponent('RainbarrelMobile.AccountTab', () => AccountTab, store, Provider);
};

export default registerScreens;
