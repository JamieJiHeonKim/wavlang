import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Transcribe from './TranscribePage/TranscribePage';
import Footer from '../../sections/Footer/Footer';

const About = () => {
    return (
        <>
            <Navbar />
            <Transcribe />
            <Footer />
        </>
    );
};

export default About;