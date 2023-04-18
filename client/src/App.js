import './App.scss';

// react router
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Root from './routes/root';
import ErrorPage from './error-page';

import MediaCard from './components/mediaCard/MediaCard';
import ProfilePage from './components/profilePage/ProfilePage';
import Home from './components/home/Home';

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
