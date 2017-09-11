import { Navigation } from 'react-native-navigation';
import Login from '../components/auth/Login';
import Signup from '../components/auth/Signup';
import Testing from '../components/Testing';

const registerScreens = (store, Provider) => {
  Navigation.registerComponent('rbMobile.Login', () => Login, store, Provider);
  Navigation.registerComponent('rbMobile.Signup', () => Signup, store, Provider);
  Navigation.registerComponent('rbMobile.Testing', () => Testing, store, Provider);
};

export default registerScreens;
