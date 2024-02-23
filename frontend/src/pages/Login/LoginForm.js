import React from 'react';
import './LoginForm.scss';
import Logo from '../../assets/sitelogo-whitebackground.png';
import { FaUser, FaLock } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const LoginForm = () => {
    return (
        <section className='wrapper' data-aos="fade-up" data-aos-duration="1500">
            <div className='container'>
                <div className='form-data'>
                    <form action="">
                        <img className='image' src={Logo} />
                        <input
                            type="text"
                            placeholder='Email address'
                        />
                        <input type="password" placeholder='Password' />
                        <button className='appointment-btn' type="submit">
                            Log in
                        </button>
                        <a className='password-resert' href='/'>
                            Forgot password?
                        </a>
                        <p>Don't have an account? <a href='/'>Sign up</a></p>
                        <span className='has-separator'>Or</span>
                        <a href='/' className='google-login'>
                            <i className='fa-google' /> Log in with Google
                        </a>
                    </form>
                </div>
            </div>
        </section>
        
    )
}

export default LoginForm;