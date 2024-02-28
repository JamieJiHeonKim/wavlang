import { React, useState, useEffect, useRef } from 'react';
import './Signup.scss';
import Logo from '../../assets/sitelogo-whitebackground.png';
import axios from 'axios';
import { Checkbox } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';

const FormRulesDialog = ({ open, onClose }) => {
    return (
        <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Form Submission Rules</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    To submit this form, you must fill in all required fields:
                </DialogContentText>
                <ul>
                    <li>First Name & Last Name must be <strong>at least 2 characters</strong> long.</li>
                    <li>Email should be in a valid email format <strong>(example@example.com)</strong>.</li>
                    <li>Password must be <strong>at least 8 characters</strong> long with <strong>at least 1 special character</strong>.</li>
                    <li>Confirm Password <strong>must match</strong> the Password.</li>
                    <li>You <strong>must accept</strong> the Terms and Conditions.</li>
                </ul>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
};

FormRulesDialog.defaultProps = {
    open: false,
    onClose: () => {},
};

const Signup = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [touched, setTouched] = useState({});
    const [input, setInput] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        checked: false
    });

    const [error, setError] = useState({});

    const handleBlur = e => {
        const { name } = e.target;
        setTouched(prev => ({ ...prev, [name]: true }));
        validateInput(e);
    };
    
    const renderErrorMessage = () => {
        if (error && touched) {
            if (error.firstName && touched.firstName) {
                return <p className="error-message">{error.firstName}</p>;
            } else if (error.lastName && touched.lastName) {
                return <p className="error-message">{error.lastName}</p>;
            }
        }
        return null;
    };

    const onInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        const newValue = type === 'checkbox' ? checked : value;
        setInput((prev) => ({
            ...prev,
            [name]: newValue,
        }));
        if (touched[name]) {
            validateInput(e);
        }
    };

    const validateName = (name) => {
        const regex = /^[a-zA-Z]+(?:['-][a-zA-Z]+)*$/;
        return regex.test(name) && name.length >= 2;
    };

    const validateEmail = (email) => {
        const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return regex.test(email);
    }

    const validatePassword = (password) => {
        const minLength = password.length >= 8;
        const specialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
      
        return minLength && specialChar;
    };

    const validateInput = e => {
        const { name, value, type, checked } = e.target;
        let newState = { ...error };

        if (type === 'checkbox') {
            return '';
        } else {
            switch (name) {
                case "firstName":
                case "lastName":
                    if (!validateName(value)) {
                        newState[name] = "Invalid character or must be at least 2 characters long";
                    } else {
                        newState[name] = '';
                    }
                    break;
                case "email":
                    if (!validateEmail(value)) {
                        newState[name] = "Invalid email format";
                    } else {
                        newState[name] = '';
                    }
                    break;
                case "password":
                    if (!validatePassword(value)) {
                        newState[name] = "Password must be at least 8 characters long with at least 1 special character";
                    } else {
                        newState[name] = '';
                    }
                    break;
                case "confirmPassword":
                    if (input.password && value !== input.password) {
                        newState[name] = "Your passwords do not match";
                    } else {
                        newState[name] = '';
                    }
                    break;
                default:
                    newState[name] = '';
                    break;
            }
        }

        setError(prev => ({ ...prev, ...newState }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let newErrors = {};
        let isValid = true;
    
        Object.keys(input).forEach(key => {
            const value = input[key];
            const type = key === 'checked' ? 'checkbox' : 'text';
            const fakeEvent = { target: { name: key, value, type }};
            const validationResult = validateInput(fakeEvent);
            if (validationResult) {
                newErrors[key] = validationResult;
                isValid = false;
            }
        });
    
        if (!input.checked) {
            newErrors.checked = "You must accept the Terms and Conditions.";
            isValid = false;
        }
    
        setError(newErrors);
    
        if (isValid) {
            createUser(input);
        } else {
            setIsModalOpen(true);
        }
    }

    const createUser = async (obj) => {
        try{
            const user = {
                "firstName": obj.firstName,
                "lastName": obj.lastName,
                "email": obj.email,
                "password": obj.password
            };
            await axios
                .post("http://localhost:8080/api/new_user", user, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
                .then((res) => {
                    console.log("A new user has been added in the system.");
                    console.log(res);
                })
                .catch((err) => {
                    console.log("Adding a new user failed.");
                    console.log(err)
                });
        } catch (error) {
            throw error;
        }
    };

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
                            <div className='name'>
                                <input
                                    type="text"
                                    name="firstName"
                                    placeholder='First Name'
                                    value={input.firstName}
                                    required
                                    style={{ marginBottom: '10px' }}
                                    onChange={onInputChange}
                                    onBlur={handleBlur}></input>
                                    
                                <input
                                    type="text"
                                    name="lastName"
                                    placeholder='Last Name'
                                    value={input.lastName}
                                    required
                                    style={{ marginBottom: '10px' }}
                                    onChange={onInputChange}
                                    onBlur={handleBlur}></input>
                            </div>
                            {renderErrorMessage()}
                            <input
                                type="text"
                                name="email"
                                placeholder='Email'
                                value={input.email}
                                required
                                style={{ marginBottom: '10px' }}
                                onChange={onInputChange}
                                onBlur={handleBlur}></input>
                                {touched.email && error.email && <p className="error-message">{error.email}</p>}
                            <input
                                type="password"
                                name="password"
                                placeholder='Create password'
                                value={input.password}
                                required
                                style={{ marginBottom: '10px' }}
                                onChange={onInputChange}
                                onBlur={handleBlur}></input>
                                {error.password && <span className='err'>{error.password}</span>}
                            <input
                                type="password"
                                name="confirmPassword"
                                placeholder='Confirm password'
                                value={input.confirmPassword}
                                required
                                style={{ marginBottom: '10px' }}
                                onChange={onInputChange}
                                onBlur={handleBlur}></input>
                                {error.confirmPassword && <span className='err'>{error.confirmPassword}</span>}
                            <div className='checkbox'>
                                <label className="checkbox-label">
                                    <input
                                    type="checkbox"
                                    name="checked"
                                    className="checkbox-input"
                                    checked={input.checked}
                                    onChange={onInputChange}
                                    required
                                    />
                                    <span className="checkbox-text" >Accept <a href='/terms_conditions'>Terms and Conditions</a></span>
                                </label>
                            </div>
                            <FormRulesDialog
                                open={isModalOpen}
                                onClose={() => setIsModalOpen(false)}
                            />
                            <button 
                                className='appointment-btn' 
                                type='submit' 
                                onClick={handleSubmit}>
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Signup;