import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import store from "./store/index";
import { Provider } from "react-redux";


// react router
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import ErrorPage from './error-page';

import MediaCard from './components/mediaCard/MediaCard';
import ProfilePage from './components/profilePage/ProfilePage';
import ProfileForm from './components/profileForm/ProfileForm';
import Home from './components/home/Home';

import SignIn from './components/signIn/SignIn';
import SignUp from './components/signup/Signup';
import Loading from './components/loading/Loading';



axios.defaults.withCredentials = true;
axios.defaults.validateStatus = () => true;



const router = createBrowserRouter([
  {
    path: '/',
    element:<App/>,
    errorElement: <ErrorPage/>,
    children: [
      {
        path: '/',
        element: <Home/>
      },
      {
        path: '/explore',
        element: <div>Explore</div>
      },
      {
        path: '/direct/inbox',
        element: <MediaCard/>
      },
      {
        path: '/profile',
        element: <ProfilePage />
      }
    ]
  },
  {
    path: '/signin',
    element: <SignIn/>
  },
  {
    path: '/signup',
    element: <SignUp/>
  },
  {
    path: '/profile/add',
    element: <ProfileForm/>
  }
]);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <div className="app">
                <RouterProvider router={router} />
            </div>
        </Provider>
    </React.StrictMode>
);
