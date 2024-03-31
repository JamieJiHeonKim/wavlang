import React from 'react';
import Sidebar from '../../Global/Sidebar';
import Topbar from '../../Global/Topbar';
import { Link } from 'react-router-dom';
import { ColorModeContext, useMode } from '../../../../theme';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { Routes, Route } from 'react-router-dom';
import Team from '../Team/Team';
import Invoices from '../Invoices/Invoices';
import Contacts from '../Contacts/Contacts';
import Bar from '../Bar/Bar';
import Form from '../Form/Form';
import Line from '../Line/Line';
import Pie from '../Pie/Pie';
import FAQ from '../Faq/Faq';
import Geography from '../Geography/Geography';
import Calendar from '../Calendar/Calendar';

const Dashboard = () => {
    const [theme, colorMode] = useMode();

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <div className='dashboard-background'>
                    <Sidebar />
                    <main className='content'>
                        <Topbar />
                        <Routes>
                            <Route path='/' element={<Dashboard />} />
                            <Route path='/team' element={<Team />} />
                            <Route path='/contacts' element={<Contacts />} />
                            <Route path='/invoices' element={<Invoices />} />
                            <Route path='/form' element={<Form />} />
                            <Route path='/bar' element={<Bar />} />
                            <Route path='/pie' element={<Pie />} />
                            <Route path='/line' element={<Line />} />
                            <Route path='/faq' element={<FAQ />} />
                            <Route path='/geography' element={<Geography />} />
                            <Route path='/calendar' element={<Calendar />} />
                        </Routes>
                    </main>
                </div>
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
};

export default Dashboard;