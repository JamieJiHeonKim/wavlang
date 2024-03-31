import { React, useState, useEffect } from 'react';
import './Navbar.scss';
import logo from './../../assets/sitelogo-whitebackground.png';
import {Link} from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const Navbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const navbarItems = [
        {
            name: 'Home',
            path: '/',
        },
        {
            name: 'Transcribe',
            path: '/transcribe'
        },
        {
            name: 'Pricing',
            path: '/pricing',
        },
        // {
        //     name: 'About Us',
        //     path: '/about',
        // },
        {
            name: 'Updates',
            path: '/updates',
        },
        {
            name: 'Contact Us',
            path: '/contact',
        },
    ];

    const handleLoggedIn = async () => {
        if (localStorage.getItem("token") && localStorage.getItem("email")) {
            const user_token = localStorage.getItem("token");
            const decoded = jwtDecode(user_token);
            console.log(decoded.userId);
            console.log(user_token)
            try {
                const res = await axios.get(`http://localhost:8080/api/user/${decoded.userId}`, {
                    headers: { 'x-access-token': decoded.userId }
                });
                console.log(res);
                setIsLoggedIn(true);
            } catch (err) {
                if (err.response) {
                    console.error(err.response);
                }
            setIsLoggedIn(false);
            }
        } else {
            setIsLoggedIn(false);
        }
    };

    useEffect(() => {
        console.log(isLoggedIn);
        handleLoggedIn();
    }, [isLoggedIn])

    return (
        <div className='main-nav'>
            <div className="container">
                <nav className="navbar navbar-expand-lg">
                    <div className="container-fluid">
                        {/* Logo */}
                        <Link className="navbar-brand" to="/">
                            <img src={logo} alt="logo" />
                        </Link>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            {/* Navbar Link */}
                            <ul className="navbar-nav m-auto mb-2 mb-lg-0">
                               { 
                                navbarItems.map((navSingle, index) => {
                                    const key = `nav-item-${navSingle.name}-${index}`;
                                    return (
                                        <li className='nav-item' key={key}>
                                        <Link className='nav-link' to={navSingle.path}>{navSingle.name}</Link>
                                        </li>
                                    );
                                })
                                    // <li className="nav-item" key={navSingle.id}>
                                    //     <Link className="nav-link" to={navSingle.path}>{navSingle.name}</Link>
                                    // </li>
                                }
                            </ul>
                            
                            {/* Navbar Button */}
                            {/* <div className="theme-btn">
                                <Link to="/login">Login</Link>
                            </div> */}
                            {/* {handleLoggedIn} */}
                            {
                                isLoggedIn ? 
                                    <div className='theme-btn'>
                                        <Link to="/dashboard/user">Profile</Link>
                                    </div> :
                                    <div className='theme-btn'>
                                        <Link to="/login">Login</Link>
                                    </div>
                            }
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    );
};

export default Navbar;