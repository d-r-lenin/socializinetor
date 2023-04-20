import './App.scss';

// react router
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Root from './routes/root';
import ErrorPage from './error-page';

import MediaCard from './components/mediaCard/MediaCard';
import ProfilePage from './components/profilePage/ProfilePage';
import Home from './components/home/Home';

import SignIn from './components/signIn/SignIn';

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
  },{
    path: '/signin',
    element: <SignIn/>
  }
]);


function App() {
  return (
    <div className="app">
      <RouterProvider router={router}/>
    </div>
  );
}


export default App;
