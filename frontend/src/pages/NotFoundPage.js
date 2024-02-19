import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import PageNotFound from './NotFoundPage/NotFoundPage';
import Footer from '../sections/Footer/Footer';

const NotFoundPage = () => {
    return (
        <>
            <Navbar />
            <PageNotFound />
            <Footer />
        </>
    );
};

export default NotFoundPage;