import React from 'react';
import { Box } from "@mui/material";
import Header from "./Dashboard/Components/Header/Header";
import Dashboard from "./Dashboard/Components/Dashboard/Dashboard"

const DashboardPage = () => {
    return (
        // <Box m="20px">
        //     <Box display="flex" justifyContent="space-between" alignItems="center">
        //         <Header title="DASHBOARD" subtitle="Welcome to the dashboard" />
        //     </Box>
        // </Box>
        <Dashboard />
    );
};

export default DashboardPage;