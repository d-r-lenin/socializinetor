import axios from "axios";


import './App.scss';

// react router
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Root from './routes/root';
import ErrorPage from './error-page';

import MediaCard from './components/mediaCard/MediaCard';
import ProfilePage from './components/profilePage/ProfilePage';
import Home from './components/home/Home';

import SignIn from './components/signIn/SignIn';
import SignUp from './components/signup/Signup';
import Loading from './components/loading/Loading';


const router = createBrowserRouter([
  {
    path: '/',
    element:<Root/>,
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
  }
]);


function App() {

  function signout(){
    axios
        .get("http://192.168.0.101:4000/user/logout")
        .then((res) => {
            console.log(res);
        })
        .catch((err) => {
            console.error(err);
        });
  }

  return (
    <div className="app">
      <RouterProvider router={router}/>
      <button onClick={signout} >logout</button>
    </div>
  );
}


export default App;
