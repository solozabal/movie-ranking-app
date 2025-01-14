import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDTOicztDWbF0JSWaZLEL71VwH79dvYNTk",
    authDomain: "movie-ranking-app-project.firebaseapp.com",
    projectId: "movie-ranking-app-project",
    storageBucket: "movie-ranking-app-project.firebasestorage.app",
    messagingSenderId: "244830100921",
    appId: "1:244830100921:web:e0b886de517bdb73106a68"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };