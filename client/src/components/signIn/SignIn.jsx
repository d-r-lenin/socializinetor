import React from 'react'

function FInput({type, name, placeholder}){
    return (
        <div className='finput'>
            <input type={type} name={name} placeholder={placeholder} />
        </div>
    )
}

function SignIn() {
  return (
    <div className='signin'>
        <div className='signin__container'>
            <form className='signin__form'>
                <FInput type='text' name='username' placeholder='Username' />
                <FInput type='password' name='password' placeholder='Password' />
                <button type='submit'>Sign In</button>
            </form>
            <div className='signin__footer'>
                <a href='/'>Forgot password?</a>
                <a href='/signup'>Sign up for Sozi</a>
            </div>
        </div>

    </div>
  )
}

export default SignIn