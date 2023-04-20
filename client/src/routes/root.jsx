import './root.scss';


import {
  Outlet
} from "react-router-dom";
import { useEffect } from 'react';
import axios from 'axios';
import {
  IoLogoInstagram
} from "react-icons/io5";

import Nav from "../components/nav/Nav";


export default function Root() {

  useEffect(() => {
     axios.defaults.withCredentials = true;
      axios.get('http://localhost:4000/user/ping').then(res => {
          if(res.status !== 200){
            throw new Error('Not logged in');
          }
      }).catch(err => {
          // window.location.href = '/signin';
          console.error(err)
      })
  }, []);


    return (
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
                    <footer className="main-layout__footer">
                        <div className="main-layout__footer__text">
                            <p>© 2021 INSTAGRAM FROM FACEBOOK</p>
                        </div>
                    </footer>
                </main>
            </div>
    );
  }