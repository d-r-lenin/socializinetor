import './Signup.scss'

import React from 'react'
import {Link} from 'react-router-dom'

function FInput({type, name, placeholder}){
    return (
        <div className='finput'>
            <input className='finput__input' type={type} name={name} placeholder={placeholder} />
        </div>
    )
}

function SignUp() {
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
              <form className="signup__form">
                  <FInput type="text" name="username" placeholder="Username" />
                  <FInput type="password" name="password" placeholder="Password" />
                  <FInput type="confirmPassword" name="confirmPassword" placeholder="confirmPassword" />
                  <input className="signup__button" type="submit" value="Sign Up" />
              </form>
              <div className="signup__footer">
                  <Link to='/' className="signup__footer-link">
                      Forgot password?
                  </Link>
                  <Link to='/signin' className="signup__footer-link" >
                        Already have an account?
                  </Link>
              </div>
          </div>
      </div>
  );
}

export default SignUp