import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import { useState, useContext, useMemo } from 'react'
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import AppBar from '@mui/material/AppBar'
import Tooltip from '@mui/material/Tooltip';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom'
import UserContext from '../../userContext';
import { useWindowResize } from '../WindowResized';
import { CssBaseline } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';


const tabContainerStyles = {
    flexGrow: 1,
    width: "100%",
    bgcolor: 'background.paper',
    color: 'primary.main',
    // height: '100%',
    // position: 'relative'
}

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

    const matchesSmDown = useMediaQuery(theme.breakpoints.down('sm'));
    const matchesSmUp = useMediaQuery(theme.breakpoints.up('sm'));

    const dynamicTopStyle = {
        ...matchesSmDown && { top: 55 },
        ...matchesSmUp && { top: 64 }
    }

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

    const activeUserRoutes = [...roleRoutes[userType.slice(0, 3)].routes]

    useMemo(() => {
        let pathExtract = [...location.pathname.split('/')];
        pathExtract.length <= 2 ? setPathValue("") : setPathValue(pathExtract[2]); 
        let pathToValue = activeUserRoutes.indexOf(pathValue)
        setValue(pathToValue !== value ? pathToValue : value);
        
    }, [location.pathname, pathValue, value])


    return (
        <Box component="div" sx={{ width: "100%", bgcolor: 'background.paper' }}>
            <AppBar position="sticky" sx={{ m: 0, p: 0, height: 53, ...dynamicTopStyle }}>
                <Tabs 
                    value={value} 
                    onChange={handleChange} 
                    textColor='inherit'
                    indicatorColor='secondary'
                    scrollButtons="auto"
                    variant='scrollable'
                    aria-label="dashboard section tabs"
                    allowScrollButtonsMobile
                    sx={{ mt: .7, mx: 'auto', borderBottom: `2px solid ${theme.palette.secondary}` }}
                    >
                    {
                        userType === "dev-user"
                        ? 
                        roleRoutes.dev.routes.map((value, i) => (
                            <Tooltip title={roleRoutes.dev.tips[i]}>
                                <Tab 
                                    key={roleRoutes.dev.routes.indexOf(value)}
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
                                    key={roleRoutes.inv.routes.indexOf(value) * -1}
                                    label={roleRoutes.inv.label[i]} 
                                    to={`${value}`} 
                                    onClick={()=> navigate(value, {replace: true})} 
                                    component={Link} 
                                    sx={{ fontFamily: ffam, textTransform: 'none'}} 
                                    />
                            </Tooltip>
                        ))
                    }
                </Tabs>
            </AppBar>
        
            <div style={tabContainerStyles} id='current-tab-body-content'>
                {/* The respective tab/route selected is rendered */}
                <Outlet />
            </div>
        </Box>
    );
}

export default Dashboard;

