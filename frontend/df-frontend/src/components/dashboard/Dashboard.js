import * as React from 'react';
import { Link } from "react-router-dom"
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useTheme } from '@mui/material/styles'
import AppBar from '@mui/material/AppBar'
import Typography from '@mui/material/Typography';

import Tooltip from '@mui/material/Tooltip';



function TabPanel(props) {
    // const theme = useTheme();
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
            <Box sx={{ px: 3, py: 8}}>
                <Typography>{children}</Typography>
            </Box>
            )}
        </div>
    );
}


function Dashboard({extraStyles, leftShift}) {
    const theme = useTheme();
    const ffam = theme.typography.fontFamily;
    
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%', bgcolor: 'background.paper', ...extraStyles }}>
            <AppBar position="static" sx={{ m: 0, p: 0 }}>
                <Tabs 
                    value={value} 
                    onChange={handleChange} 
                    // textColor='inherit'
                    indicatorColor='secondary'
                    scrollButtons="auto"
                    variant='scrollable'
                    // allowScrollButtonsMobile
                    sx={{ mt: .6, mx: 'auto', borderBottom: `2px solid ${theme.palette.secondary}` }}
                    >

                    {/* Hot Swapping for page-specific tabbing -> ie. Messages, Project Tracking, Current Work, etc... */}
                    {/* Dynamically Load these Tabs ? (*tried on main nav with some issues though was mess with custom vertical/disappearing tab) */}
                    <Tooltip title="Dashboard/Home">
                        <Tab label="Home" sx={{ fontFamily: ffam, textTransform: 'none'}} />
                    </Tooltip>
                    <Tooltip title="Dashboard/Tasks">
                        <Tab label="Tasks" sx={{ fontFamily: ffam, textTransform: 'none'}} />
                    </Tooltip>
                    <Tooltip title="Dashboard/Team">
                        <Tab label="Team" sx={{ fontFamily: ffam, textTransform: 'none'}} />
                    </Tooltip>
                    <Tooltip title="Dashboard/Messages">
                        <Tab label="Messges" sx={{ fontFamily: ffam, textTransform: 'none'}} />
                    </Tooltip>
                    <Tooltip title="Dashboard/Schedule">
                        <Tab label="Schedule" sx={{ fontFamily: ffam, textTransform: 'none'}} />
                    </Tooltip>
                </Tabs>
            </AppBar>

            {/* Dynamically load these - i.e. for each in this passed list build the panel according to each route */}
            <TabPanel value={value} index={0}>
                <Typography sx={{color: 'white'}}>
                    Item Supposed to be Dash-Home
                </Typography> 
            </TabPanel>
            <TabPanel value={value} index={1}>
                <Typography sx={{color: 'white'}}>
                    Item Supposed to be Dash-Tasks
                </Typography> 
            </TabPanel>
            <TabPanel value={value} index={2}>
                <Typography sx={{color: 'white'}}>
                Item Supposed to be my Dash-Team
                </Typography> 
            </TabPanel>
            <TabPanel value={value} index={3}>
                <Typography sx={{color: 'white'}}>
                Item Supposed to be my Dash-Messages
                </Typography> 
            </TabPanel>
            <TabPanel value={value} index={4}>
                <Typography sx={{color: 'white'}}>
                Item Supposed to be my Dash-Schedule
                </Typography> 
            </TabPanel>
        </Box>
    );
}

// const Header = () => {
//     return (
//         <header>
//             <Typography variant="h6">Secondary Appbar</Typography>
//             <nav>
//                 <Typography>
//                     <ul>
//                         <li><Link to="/">Home</Link></li>
//                         <li><Link to="projects">Projects</Link></li>
//                         <li><Link to="teams">Teams</Link></li>
//                     </ul>
//                 </Typography>
//             </nav>
//         </header>
//     )
// }

export default Dashboard;

