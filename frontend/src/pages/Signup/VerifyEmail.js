import { React, useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import queryString from 'query-string';
import './VerifyEmail.scss';
import Logo from '../../assets/sitelogo-whitebackground.png';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import OTPInput from 'react-otp-input';

const baseUrl = 'http://localhost:8080/api/user';

const VerifyEmail = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const {token, id} = queryString.parse(location.search);
    const [isError, setIsError] = useState(false);
    const [message, setMessage] = useState("");
    const [invalidUser, setInvalidUser] = useState("");
    const [success, setSuccess] = useState(false);
    const [OTP, setOTP] = useState("");
    const [response, setResponse] = useState("");
    const [error, setError] = useState({});
    
    const verifyToken = async () => {
        try{
            const { data } = await axios.get(
                `${baseUrl}/verify-email?token=${token}&id=${id}`
            );
            console.log("data:", data);
        } catch (error) {
            setIsError(true);
            console.log(isError);
            if(error?.response.data) {
                const { data } = error.response;
                if(!data.success) {
                    setMessage(data.error);
                    return(
                        setInvalidUser(data.error)
                    )
                }
                return(
                    console.log(error.response.data)
                )
            }
            console.log(error);
        }
    }

    const verifyEmailCode = async (otp) => {
        try {
            const {data} = await axios.post(
                `${baseUrl}/reset-password?token=${token}&id=${id}`,
                {otp}
            );
            if(data.success) {
                setSuccess(true);
                navigate('/login', { state: { message: data.message } });
            }
        } catch (error) {
            if (error?.response?.data) {
                const {data} = error.response;
                setResponse({message: error.response.data.error});
                if(!data.success) {
                    return(
                        setError(error.response.data.error)
                    )
                }
                console.log(error);
            }
        }
        
    }

    useEffect(() => {
        verifyToken();
    }, [isError])

    return (
        <>
            <a href='/login' className="go-back-btn">
                <FontAwesomeIcon icon={faArrowLeft} />
            </a>
            <section className='wrapper' data-aos="fade-up" data-aos-duration="1500">
                <div className='container'>
                    <div className='form-data'>
                        <form action="">
                            <img className='image' src={Logo} alt="logo"/>
                            <p style={{ marginBottom: '10px' }}>
                                Enter your verification code here
                            </p>
                            <OTPInput
                                onChange={setOTP}
                                value={OTP}
                                numInputs={6}
                                renderSeparator={<span></span>}
                                inputStyle="otpInputBox"
                                renderInput={(props) => <input {...props} />}
                            />
                            <button 
                                className='appointment-btn'
                                type='submit'>
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </section>
        </>
    )
}

export default VerifyEmail;