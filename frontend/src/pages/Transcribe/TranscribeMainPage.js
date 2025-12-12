import React, { useEffect, useContext } from 'react';
import Transcribe from './TranscribePage/TranscribePage';
import LoggedOutTranscribePage from './TranscribePage/LoggedOutTranscribePage';
import { useAuth } from '../../components/AuthContext/AuthContext';
import Cookies from 'js-cookie';


const TranscribeMainPage = () => {
    const { isLoggedIn, setIsLoggedIn } = useAuth();
    const userFirstName = Cookies.get('firstName');
    const userLastName = Cookies.get('lastName');

    useEffect(() => {
        console.log("Authentication state changed. isLoggedIn:", isLoggedIn);
    // }, [useAuth()]);
    }, [isLoggedIn]);

    return (
        <>
            {isLoggedIn ? (
                <Transcribe />
            ) : (
                <LoggedOutTranscribePage />
            )}
            
        </>
    );
};

export default TranscribeMainPage;