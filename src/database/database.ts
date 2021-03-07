import firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyCfegHTC3DZOBd96gOrQewHDfSmuoIfc0o',
  authDomain: 'xati-app.firebaseapp.com',
  databaseURL: 'https://xati-app-default-rtdb.firebaseio.com',
  projectId: 'xati-app',
  storageBucket: 'xati-app.appspot.com',
  messagingSenderId: '771501110601',
  appId: '1:771501110601:web:569ca3c4614247fa791698',
  measurementId: 'G-MLDQV6C0FP',
};

firebase.initializeApp(firebaseConfig);

export default firebase;
