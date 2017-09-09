import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import { Provider } from 'react-redux';
import Firebase from 'firebase';
import reducers from './reducers';

class App extends React.Component {
  componentWillMount() {
    const config = {
      apiKey: 'AIzaSyC2d9VA15vv6f9V4R3c2biw7oXUSERP8S4',
      authDomain: 'rainbarrel-b1575.firebaseapp.com',
      databaseURL: 'https://rainbarrel-b1575.firebaseio.com',
      projectId: 'rainbarrel-b1575',
      storageBucket: 'rainbarrel-b1575.appspot.com',
      messagingSenderId: '212513060145'
    };

    Firebase.initializeApp(config);
  }

  render() {
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

    return (
      <Provider store={store}>
        
      </Provider>
    );
  }
}

export default App;
