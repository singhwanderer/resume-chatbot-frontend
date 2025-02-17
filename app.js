import firebase from 'firebase/app';
import 'firebase/auth'; // Import Firebase Authentication

// Your Firebase configuration object
const firebaseConfig = {
  apiKey: 'your-api-key',
  authDomain: 'your-auth-domain',
  projectId: 'your-project-id',
  storageBucket: 'your-storage-bucket',
  messagingSenderId: 'your-sender-id',
  appId: 'your-app-id',
  measurementId: 'your-measurement-id',  // Optional for analytics
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Now, you can implement authentication logic
function signInAnonymously() {
  firebase.auth().signInAnonymously()
    .then((result) => {
      const user = result.user;
      console.log('User signed in anonymously: ', user);
    })
    .catch((error) => {
      console.error('Error during anonymous sign-in: ', error);
    });
}
