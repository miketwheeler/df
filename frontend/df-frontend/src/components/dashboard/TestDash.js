import * as React from 'react';
// import { Link } from "react-router-dom"
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useTheme } from '@mui/material/styles'
import AppBar from '@mui/material/AppBar'
import Typography from '@mui/material/Typography';

import Tooltip from '@mui/material/Tooltip';

import PropTypes from 'prop-types';
import {
    MemoryRouter,
    Route,
    Routes,
    Link,
    matchPath,
    useLocation,
} from 'react-router-dom';
import { StaticRouter } from 'react-router-dom/server';

function Router(props) {
    const { children } = props;
    if (typeof window === 'undefined') {
        return <StaticRouter location="/">{children}</StaticRouter>;
    }

    return (
        <MemoryRouter initialEntries={['/']} initialIndex={0}>
            {children}
        </MemoryRouter>
    );
}

Router.propTypes = {
    children: PropTypes.node,
};

function useRouteMatch(patterns) {
    const { pathname } = useLocation();

    for (let i = 0; i < patterns.length; i += 1) {
        const pattern = patterns[i];
        const possibleMatch = matchPath(pattern, pathname);
        if (possibleMatch !== null) {
            return possibleMatch;
        }
    }

    return null;
}

function MyTabs({extraStyles, leftShift}) {
    const theme = useTheme();
    const ffam = theme.typography.fontFamily;

    //  Added
    const routeMatch = useRouteMatch(['/home', '/tasks', '/team', '/messges', '/schedule']);
    const currentTab = routeMatch?.pattern?.path;
    // =========

    // const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        // setValue(newValue);
        event.preventReload();
        currentTab(routeMatch?.pattern?.path);
    };

    return (
        <Box sx={{ width: '100%', bgcolor: 'background.paper', ...extraStyles }}>
            <AppBar position="static" sx={{ m: 0, p: 0 }}>
                <Tabs 
                    value={currentTab} 
                    onChange={handleChange} 
                    textColor='inherit'
                    indicatorColor='secondary'
                    scrollButtons="auto"
                    variant='scrollable'
                    sx={{ mt: .6, mx: 'auto', borderBottom: `2px solid ${theme.palette.secondary}` }}
                    >
                    <Tooltip title="Dashboard/Home">
                        <Tab label="Home" value="/home" to="/dash-home" component={Link} sx={{ fontFamily: ffam, textTransform: 'none'}} />
                    </Tooltip>
                    <Tooltip title="Dashboard/Tasks">
                        <Tab label="Tasks" value="/tasks" to="/dash-tasks" component={Link} sx={{ fontFamily: ffam, textTransform: 'none'}} />
                    </Tooltip>
                    <Tooltip title="Dashboard/Team">
                        <Tab label="Team" value="/team" to="/dash-team" component={Link} sx={{ fontFamily: ffam, textTransform: 'none'}} />
                    </Tooltip>
                    <Tooltip title="Dashboard/Messages">
                        <Tab label="Messages" value="/messages" to="/dash-messages" component={Link} sx={{ fontFamily: ffam, textTransform: 'none'}} />
                    </Tooltip>
                    <Tooltip title="Dashboard/Schedule">
                        <Tab label="Schedule" value="/schedule" to="/dash-schedule" component={Link} sx={{ fontFamily: ffam, textTransform: 'none'}} />
                    </Tooltip>
                </Tabs>
            </AppBar>
        </Box>
    );
}

function CurrentRoute() {
    const location = useLocation();
    console.log("currentRoute: ", location)
}


export default function Dashboard() {
    return (
        <Box sx={{ width: '100%' }}>
            <Routes>
                <Route path="*" element={<CurrentRoute />} />
            </Routes>
            <MyTabs />
        </Box>
    );
}