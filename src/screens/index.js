import { Navigation } from 'react-native-navigation';
import Testing from '../components/Testing';

const registerScreens = (store, Provider) => {
  Navigation.registerComponent('rbMobile.Testing', () => Testing, store, Provider);
};

export default registerScreens;
