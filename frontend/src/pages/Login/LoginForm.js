import { React, useState } from 'react';
import './LoginForm.scss';
import Logo from '../../assets/sitelogo-whitebackground.png';
import { FaUser, FaLock } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';
import { useDispatch } from 'react-redux';
import { signinGoogle, signin } from '../../redux/actions/auth';

const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleGoogleLoginSuccess = (tokenResponse) => {
        const accessToken = tokenResponse.access_token;
        dispatch(signinGoogle(accessToken, navigate));
    };

    const login = useGoogleLogin({
        onSuccess: handleGoogleLoginSuccess
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (email !== "" && password !== "") {
            dispatch(signin({
                email,
                password
            },
            navigate))
        };
    };

    const googleLogin = useGoogleLogin({
        onSuccess: (tokenResponse) => {
            console.log('Google login successful', tokenResponse);
        },
        onError: () => {
            console.error('Google login failed');
        },
        flow: 'auth-code',
    });



    return (
        <section className='wrapper' data-aos="fade-up" data-aos-duration="1500">
            <div className='container'>
                <div className='form-data'>
                    <form action="">
                        <img className='image' src={Logo} />
                        <input
                            type="text"
                            placeholder='Email address'
                            required
                            style={{ marginBottom: '10px' }}
                            onChange={e => setEmail(e.target.value)}
                        />
                        <input 
                            type="password"
                            placeholder='Password'
                            required
                            onChange={e => setPassword(e.target.value)}
                        />
                        <button className='appointment-btn' type="submit">
                            Sign in
                        </button>
                        <a href='/' className='forgotpassword-url' >Forgot password?</a>
                        <p className='signup' >Don't have an account? <a href='/' className='signup-url' >Sign up</a></p>
                        <span className='has-separator'>Or</span>
                        {/* <a href='/' className='google-login'>
                            <i className='fa-google' />Sign in with Google
                        </a> */}
                        <button className='appointment-btn' onClick={() => login()}>
                            <i class='fa-brands fa-google'></i>Sign in with Google
                        </button>
                    </form>
                </div>
            </div>
        </section>
        
    )
}

export default LoginForm;