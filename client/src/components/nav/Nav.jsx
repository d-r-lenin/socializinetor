import './Nav.scss';

import React from 'react'
import { Link } from 'react-router-dom';

import {
    IoHomeOutline,
    IoSearchOutline,
    IoAddCircleOutline,
    IoHeartOutline,
    IoPersonOutline,
    IoMenuOutline,
    IoCompassOutline
} from 'react-icons/io5';


function Nav() {
  return (
    <div className='nav'>
        <div className='nav__sec'>
            <Link  to='/' title="Home" className='nav__home nav__icon icon-m '>
                <IoHomeOutline />
            </Link>
            <Link to='/search' title="Search" className='nav__search nav__icon icon-m'>
                <IoSearchOutline />
                </Link>
            <Link to='/explore' title="Explore" className='nav__explore nav__icon icon-m'>
                <IoCompassOutline />
            </Link>
            <div title="Create" className='nav__add nav__icon icon-m'>
                <IoAddCircleOutline />
                </div>
            <div title="Notification" className='nav__likes nav__icon icon-m'>
                <IoHeartOutline />
                </div>
            <Link to='/profile' title="Profile" className='nav__profile nav__icon icon-m'>
                <IoPersonOutline />
                </Link>
            <div title="More" className='nav__menu nav__icon icon-m'>
                <IoMenuOutline />
                </div>
        </div>
    </div>
    )
}

export default Nav