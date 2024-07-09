import React, { useState } from 'react';
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup
} from "firebase/auth";
import { useNavigate } from 'react-router-dom';

const firebaseConfig = {
  apiKey: "AIzaSyCqzhA7Q88H0dbRNfSCtH5NLYh25N9YByo",
  authDomain: "inotebook-8fb43.firebaseapp.com",
  projectId: "inotebook-8fb43",
  storageBucket: "inotebook-8fb43.appspot.com",
  messagingSenderId: "745671032698",
  appId: "1:745671032698:web:7edd6e0554c513d47ae0c3",
  measurementId: "G-BBY3710LZE"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const LoginFirebase = () => {
  const [login, setLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const authSignInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log("Signed in with Google");
        const token = GoogleAuthProvider.credentialFromResult(result).accessToken;
        localStorage.setItem('token', token);
        navigate('/');
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

  const authCreateAccountWithEmail = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const token = userCredential.user.accessToken;
        localStorage.setItem('token', token);
        console.log('Account created:', userCredential.user);
        navigate('/');
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const authLoginWithEmail = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const token = userCredential.user.accessToken;
        localStorage.setItem('token', token);
        console.log('Logged in:', userCredential.user);
        navigate('/');
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className='bg-[#234] w-full min-h-screen flex justify-center items-center'>
      {login ? (
        <div className='bg-white p-5 w-[90%] max-w-[500px] shadow-2xl rounded-[10px]'>
          <h1 className='text-center text-xl md:text-2xl font-semibold'>Login</h1>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 mt-4 border rounded"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 mt-4 border rounded"
          />
          <button
            onClick={authLoginWithEmail}
            className="w-full p-2 mt-4 bg-blue-500 text-white rounded"
          >
            Login
          </button>
          <button
            onClick={authSignInWithGoogle}
            className="w-full p-2 mt-4 bg-red-500 text-white rounded"
          >
            Sign in with Google
          </button>
          <p className="text-center mt-4">
            Don't have an account?{' '}
            <span
              onClick={() => setLogin(false)}
              className="text-blue-500 cursor-pointer"
            >
              Sign Up
            </span>
          </p>
        </div>
      ) : (
        <div className='bg-white p-5 w-[90%] max-w-[500px] shadow-2xl rounded-[10px]'>
          <h1 className='text-center text-xl md:text-2xl font-semibold'>Create Account</h1>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 mt-4 border rounded"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 mt-4 border rounded"
          />
          <button
            onClick={authCreateAccountWithEmail}
            className="w-full p-2 mt-4 bg-blue-500 text-white rounded"
          >
            Sign Up
          </button>
          <button
            onClick={authSignInWithGoogle}
            className="w-full p-2 mt-4 bg-red-500 text-white rounded"
          >
            Sign up with Google
          </button>
          <p className="text-center mt-4">
            Already have an account?{' '}
            <span
              onClick={() => setLogin(true)}
              className="text-blue-500 cursor-pointer"
            >
              Login
            </span>
          </p>
        </div>
      )}
    </div>
  );
};

export default LoginFirebase;
