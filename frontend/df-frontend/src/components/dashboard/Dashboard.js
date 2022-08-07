import * as React from 'react';
import { useState, useContext, useMemo } from 'react'
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useTheme } from '@mui/material/styles'
import AppBar from '@mui/material/AppBar'
import Tooltip from '@mui/material/Tooltip';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom'
import UserContext from '../../userContext';


function Dashboard(props) {
    const theme = useTheme();
    const ffam = theme.typography.fontFamily;
    let navigate = useNavigate();
    
    const [value, setValue] = useState(0);
    const location = useLocation();
    const [pathValue, setPathValue] = useState("");

    const userType = useContext(UserContext);

    const handleChange = (event, newValue) => {
        event.preventDefault();
        setValue(newValue);
    };

    const roleRoutes = {
        dev: {
            routes: ["", "dash-tasks", "dash-messages", "dash-schedule"],
            label: ["Home", "Tasks", "Messages", "Schedule"],
            tips: ["Dashboard/Home", "Dashboard/Tasks", "Dashboard/Team", "Dashboard/Messages", "Dashboard/Schedule"]
        },
        inv: {
            routes: ["", "dash-messages", "dash-schedule"],
            label: ["Home", "Messages", "Schedule"],
            tips: ["Dashboard/Home", "Dashboard/Messages", "Dashboard/Schedule"]
        }
    }

    // const activeUserRoutes = [...roleRoutes[userType.slice(0, 3)].routes]
    const activeUserRoutes = [...roleRoutes[userType.slice(0, 3)].routes]

    useMemo(() => {
        let pathExtract = [...location.pathname.split('/')];
        // Object.values(pathExtract).length <= 2 ? setPathValue("") : setPathValue(pathExtract[2]);
        pathExtract.length <= 2 ? setPathValue("") : setPathValue(pathExtract[2]);
        let pathToValue = activeUserRoutes.indexOf(pathValue)
        setValue(pathToValue !== value ? pathToValue : value);
    }, [location.pathname, pathValue, value])


    return (
        <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
            <AppBar position="static" sx={{ m: 0, p: 0 }}>
                <Tabs 
                    value={value} 
                    onChange={handleChange} 
                    textColor='inherit'
                    indicatorColor='secondary'
                    scrollButtons="auto"
                    variant='scrollable'
                    aria-label="dashboard section tabs"
                    allowScrollButtonsMobile
                    sx={{ mt: .6, mx: 'auto', borderBottom: `2px solid ${theme.palette.secondary}` }}
                    >
                    {
                        userType === "dev-user"
                        ? 
                        roleRoutes.dev.routes.map((value, i) => (
                            <Tooltip title={roleRoutes.dev.tips[i]}>
                                <Tab 
                                    label={roleRoutes.dev.label[i]} 
                                    to={`${value}`} 
                                    onClick={()=> navigate(value, {replace: true})} 
                                    component={Link} 
                                    sx={{ fontFamily: ffam, textTransform: 'none'}} 
                                    />
                            </Tooltip>
                        ))
                        : 
                        roleRoutes.inv.routes.map((value, i) => (
                            <Tooltip title={roleRoutes.inv.tips[i]}>
                                <Tab 
                                    label={roleRoutes.inv.label[i]} 
                                    to={`${value}`} 
                                    onClick={()=> navigate(value, {replace: true})} 
                                    component={Link} 
                                    sx={{ fontFamily: ffam, textTransform: 'none'}} 
                                    />
                            </Tooltip>
                        ))
                    }

                    {/* Hot Swapping for page-specific tabbing -> ie. Messages, Project Tracking, Current Work, etc... */}
                    {/* Dynamically Load these Tabs ? (*tried on main nav with some issues though was mess with custom vertical/disappearing tab) */}
                    {/* <Tooltip title="Dashboard/Home">
                        <Tab label="Home" to="" onClick={()=> navigate("")} component={Link} sx={{ fontFamily: ffam, textTransform: 'none'}} />
                    </Tooltip>
                    <Tooltip title="Dashboard/Tasks">
                        <Tab label="Tasks" to="dash-tasks" onClick={()=> navigate("dash-tasks")} component={Link} sx={{ fontFamily: ffam, textTransform: 'none'}} />
                    </Tooltip>
                    <Tooltip title="Dashboard/Team">
                        <Tab label="Team" to="dash-team" onClick={()=> navigate("dash-team")} component={Link} sx={{ fontFamily: ffam, textTransform: 'none'}} />
                    </Tooltip>
                    <Tooltip title="Dashboard/Messages">
                        <Tab label="Messages" to="dash-messages" onClick={()=> navigate("dash-messages")} component={Link} sx={{ fontFamily: ffam, textTransform: 'none'}} />
                    </Tooltip>
                    <Tooltip title="Dashboard/Schedule">
                        <Tab label="Schedule" to="dash-schedule" onClick={()=> navigate("dash-schedule")} component={Link} sx={{ fontFamily: ffam, textTransform: 'none'}} />
                </Tooltip> */}

                </Tabs>
            </AppBar>
            {/* The respective tab/route selected is rendered */}
            <Outlet />
            
        </Box>
    );
}

export default Dashboard;

