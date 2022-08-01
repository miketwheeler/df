import * as React from 'react';
import { useState, PropTypes } from 'react'
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useTheme } from '@mui/material/styles'
import AppBar from '@mui/material/AppBar'
// import Typography from '@mui/material/Typography';
// import DashHome from './dashboard-subpaths/DashHome'
// import DashTasks from './dashboard-subpaths/DashTasks'
// import DashTeam from './dashboard-subpaths/DashTeam'
// import DashMessages from './dashboard-subpaths/DashMessages'
// import DashSchedule from './dashboard-subpaths/DashSchedule'

import Tooltip from '@mui/material/Tooltip';
import {
    Route,
    Routes,
    Link,
    NavLink,
    Outlet,
    useNavigate,
    useLocation,
} from 'react-router-dom';
import { StaticRouter } from 'react-router-dom/server';

Tab.propTypes = {
    index: PropTypes.number.isRequired,
    value: PropTypes.string.isRequired,
};


function Dashboard({extraStyles, leftShift}) {
    const theme = useTheme();
    const ffam = theme.typography.fontFamily;
    let navigate = useNavigate();
    let loc = useLocation();
    
    const [value, setValue] = useState("");

    const handleChange = (event, newValue) => {
        event.preventDefault();
        setValue(newValue);
        navigate(`${newValue}`)
    };

    return (
        <Box sx={{ width: '100%', bgcolor: 'background.paper', ...extraStyles }}>
            <AppBar position="static" sx={{ m: 0, p: 0 }}>
                <Tabs 
                    value={value} 
                    onChange={handleChange} 
                    textColor='inherit'
                    indicatorColor='secondary'
                    scrollButtons="auto"
                    variant='scrollable'
                    
                    // allowScrollButtonsMobile
                    sx={{ mt: .6, mx: 'auto', borderBottom: `2px solid ${theme.palette.secondary}` }}
                    >

                    {/* Hot Swapping for page-specific tabbing -> ie. Messages, Project Tracking, Current Work, etc... */}
                    {/* Dynamically Load these Tabs ? (*tried on main nav with some issues though was mess with custom vertical/disappearing tab) */}
                    <Tooltip title="Dashboard/Home">
                        <Tab label="Home" value="dash-home" to="dash-home" component={Link} sx={{ fontFamily: ffam, textTransform: 'none'}} />
                    </Tooltip>
                    <Tooltip title="Dashboard/Tasks">
                        <Tab label="Tasks" value="dash-tasks" to="dash-tasks" component={Link} sx={{ fontFamily: ffam, textTransform: 'none'}} />
                    </Tooltip>
                    <Tooltip title="Dashboard/Team">
                        <Tab label="Team" value="dash-team" to="dash-team" component={Link} sx={{ fontFamily: ffam, textTransform: 'none'}} />
                    </Tooltip>
                    <Tooltip title="Dashboard/Messages">
                        <Tab label="Messages" value="dash-messages" to="dash-messages" component={Link} sx={{ fontFamily: ffam, textTransform: 'none'}} />
                    </Tooltip>
                    <Tooltip title="Dashboard/Schedule">
                        <Tab label="Schedule" value="dash-schedule" to="dash-schedule" component={Link} sx={{ fontFamily: ffam, textTransform: 'none'}} />
                    </Tooltip>
                </Tabs>
            </AppBar>

            {/* The respective tab/route selected is rendered */}
            <Outlet />
            
        </Box>
    );
}

export default Dashboard;

