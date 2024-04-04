import React from 'react';
import { Box } from "@mui/material";
import Header from "../Header/Header";

const Dashboard = () => {
    return (
        // <Box m="20px">
        //     <Box display="flex" justifyContent="space-between" alignItems="center">
        //         <Header title="DASHBOARD" subtitle="Welcome to the dashboard" />
        //     </Box>
        // </Box>
        <Box display="flex" justifyContent="space-between" alignItems="center" padding="16px">
            <Header title="DASHBOARD" subtitle="Welcome to the dashboard" />
        </Box>
    );
};

export default Dashboard;