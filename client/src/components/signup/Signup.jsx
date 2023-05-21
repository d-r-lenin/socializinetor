import './Signup.scss'

import React from 'react'
import {Link} from 'react-router-dom'


import { useDispatch, useSelector } from "react-redux";

import { isUserLoggedIn, login, register } from "../../slices/auth";


function FInput({type, name, placeholder}){
    return (
        <div className='finput'>
            <input className='finput__input' type={type} name={name} placeholder={placeholder} />
        </div>
    )
}

function SignUp() {

        const dispatch = useDispatch();
        const auth = useSelector((state) => state.auth);

        if (auth.isLoggedIn) {
            window.location.href = "/";
        }

        async function handleSignUp(e) {
            e.preventDefault();
            let username = e.target.username.value;
            let email = e.target.email.value;
            let password = e.target.password.value;
            let confirmPassword = e.target.confirmPassword.value;

            let data = {
                username,
                password,
                confirmPassword,
                email
            };

            register(data, dispatch);
        }


  return (
      <div className="signup">
          <div className="signup__container">
              <div className="signup__header">
                  <div className="signup__logo-holder">
                      <Link to="/" className="signup__logo-link">
                          <img className="signup__logo" src="/logo.png" alt="socializinator logo fount" />
                      </Link>
                  </div>
              </div>
              <form className="signup__form" onSubmit={handleSignUp}>
                  <FInput type="text" name="username" placeholder="Username" />
                  <FInput type="email" name="email" placeholder="Email" />
                  <FInput type="password" name="password" placeholder="Password" />
                  <FInput type="password" name="confirmPassword" placeholder="confirmPassword" />
                  <input className="signup__button" type="submit" value="Sign Up" />
              </form>
              <div className="signup__footer">
                  <Link to="/" className="signup__footer-link">
                      Forgot password?
                  </Link>
                  <Link to="/signin" className="signup__footer-link">
                      Already have an account?
                  </Link>
              </div>

              { !!auth.error && <div className="signup__error">{JSON.stringify(auth.error)}</div>}
          </div>
      </div>
  );
}

export default SignUp