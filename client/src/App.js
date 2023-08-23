import axios from "axios";

import './App.scss';


import { Outlet } from "react-router-dom";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  IoLogoInstagram
} from "react-icons/io5";


import { isUserLoggedIn, resetError, checkProfile } from "./slices/auth";
import ReplaceUrl from "./utils/ReplaceUrl";
import Redirect from "./utils/Redirect";

import Nav from "./components/nav/Nav";
import Loading from './components/loading/Loading';

function App() {
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);

    function signout(){
    axios
        .get("http://localhost:4000/user/logout")
        .then((res) => {
            console.log(res);
            window.location ='/';
        })
        .catch((err) => {
            console.error(err);
        });
  }

    useEffect(() => {
        console.log('root')
        isUserLoggedIn(dispatch);
        checkProfile(dispatch);
    }, [dispatch]);


    if(!auth.isProfileExist && !auth.isProfileLoading){
        return <ReplaceUrl to="/profile/add" />
    }

    return auth.isLoggedIn ? (
            <>
                <div className="main-layout">
                    <header className="main-layout__header">
                        <div className="main-layout__logo icon-m">
                            <IoLogoInstagram />
                        </div>
                        <button onClick={signout}>Sign out</button>
                        <Nav />
                    </header>
                    <main className="main-layout__main">
                        <section className="main-layout__main-section">
                            <Outlet />
                        </section>
                        {/* <footer className="main-layout__footer">
                            <div className="main-layout__footer__text">
                                <p>© 2021 INSTAGRAM FROM FACEBOOK</p>
                            </div>
                        </footer> */}
                    </main>
                </div>
            </>
    ) : (
        auth.isLoading ?(
            <Loading />
        ) : (
            <Redirect to="/signin" />
        )
    )
  }






export default App;
