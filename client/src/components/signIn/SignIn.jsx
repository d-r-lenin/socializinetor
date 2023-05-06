import './SignIn.scss'

import React from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux';

import {
    isUserLoggedIn,
    login
} from '../../slices/auth';

function FInput({type, name, placeholder}){
    return (
        <div className='finput'>
            <input className='finput__input' type={type} name={name} placeholder={placeholder} />
        </div>
    )
}

function SignIn() {
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);

    if (auth.isLoggedIn){
        window.location.href = '/'
    }

    async function handleSignIn(e){
        e.preventDefault()
        let username = e.target.username.value
        let password = e.target.password.value
        let data = {
            username,
            password
        }
        
        login(data, dispatch);
        // console.log(response)
        // if (response.statusText === 'OK'){
        //     localStorage.setItem('username', response.data.user)
        //     window.location.href = '/'
        // }
    }

  return (
    <div className='signin'>
        <div className='signin__container'>
            <div className='signin__header'>
                <div className="signin__logo-holder">
                    <Link to='/' className='signin__logo-link'>
                    <img className='signin__logo' src='/logo.png' alt="socializinator logo fount" />
                    </Link>
                </div>
            </div>
            <form className='signin__form'  onSubmit={handleSignIn}>
                <FInput type='text' name='username' placeholder='Username' />
                <FInput type='password' name='password' placeholder='Password' />
                <input className='signin__button'  type='submit' value="Sign In" />
            </form>
            <div className='signin__footer'>
                <Link to="/" className='signin__footer-link' >Forgot password?</Link>
                <Link to="/signup" className='signin__footer-link' >Sign up for Sozi</Link>
            </div>
            {
                auth.error ? <div className='signin__error'>
                    <p className='signin__error-text'>{auth.error}</p>
                </div> : null
            }
        </div>

    </div>
  )
}

export default SignIn