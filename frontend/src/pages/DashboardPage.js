import React from 'react';
import Dashboard from './Dashboard/Dashboard';
import Sidebar from '../components/Sidebar/Sidebar';
import { Link } from 'react-router-dom';

const DashboardPage = () => {
    return (
        <div className='login-background'>
            {/* <Navbar /> */}
            <Sidebar />
            {/* <Footer /> */}
        </div>
    );
};

export default DashboardPage;