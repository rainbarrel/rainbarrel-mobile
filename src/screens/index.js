import { Navigation } from 'react-native-navigation';
import Auth from '../components/Auth';
import Testing from '../components/Testing';

const registerScreens = (store, Provider) => {
  Navigation.registerComponent('rbMobile.Auth', () => Auth, store, Provider);
  Navigation.registerComponent('rbMobile.Testing', () => Testing, store, Provider);
};

export default registerScreens;
