import './root.scss';


import {
  Outlet
} from "react-router-dom";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import {
  IoLogoInstagram
} from "react-icons/io5";

import {
    isUserLoggedIn,
} from '../slices/auth';

import Nav from "../components/nav/Nav";


export default function Root() {
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);

    isUserLoggedIn(dispatch);

    return (
            auth.isLoggedIn ? <>
                <div className="main-layout">
                    <header className="main-layout__header">
                        <div className="main-layout__logo icon-m">
                            <IoLogoInstagram />
                        </div>
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
            </> : <>
                login please
            </>
    );
  }