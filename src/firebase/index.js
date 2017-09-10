import Firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyC2d9VA15vv6f9V4R3c2biw7oXUSERP8S4',
  authDomain: 'rainbarrel-b1575.firebaseapp.com',
  databaseURL: 'https://rainbarrel-b1575.firebaseio.com',
  projectId: 'rainbarrel-b1575',
  storageBucket: 'rainbarrel-b1575.appspot.com',
  messagingSenderId: '212513060145'
};

const firebaseInit = () => {
  Firebase.initializeApp(config);
};

export default firebaseInit;
