import './root.scss';

import {
  Outlet
} from "react-router-dom";
import {
  IoLogoInstagram
} from "react-icons/io5";

import Nav from "../components/nav/Nav";


export default function Root() {
    return (
      <div className="main-layout">
        <header className="main-layout__header">
          <div className="main-layout__logo icon-m">
            <IoLogoInstagram />
          </div>
          <Nav />
        </header>
        <main className="main-layout__main">
          <Outlet/>
        </main>
      </div>
    );
  }