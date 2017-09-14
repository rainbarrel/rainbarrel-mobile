import { Navigation } from 'react-native-navigation';
import Login from '../components/auth/Login';
import Signup from '../components/auth/Signup';

import {
  Search,
  LovedOnes,
  Camera,
  Account
} from '../components/top-level-tabs';

const registerScreens = (store, Provider) => {
  Navigation.registerComponent('rbMobile.Login', () => Login, store, Provider);
  Navigation.registerComponent('rbMobile.Signup', () => Signup, store, Provider);

  Navigation.registerComponent('rbMobile.Search', () => Search, store, Provider);
  Navigation.registerComponent('rbMobile.LovedOnes', () => LovedOnes, store, Provider);
  Navigation.registerComponent('rbMobile.Camera', () => Camera, store, Provider);
  Navigation.registerComponent('rbMobile.Account', () => Account, store, Provider);
};

export default registerScreens;
