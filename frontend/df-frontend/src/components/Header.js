import * as React from 'react';
import { Link } from "react-router-dom"
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useTheme } from '@mui/material/styles'
import AppBar from '@mui/material/AppBar'
import { Typography } from '@mui/material';


function TabPanel(props) {
    const theme = useTheme();
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


function Header({extraStyles, leftShift}) {
    const theme = useTheme();

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
                    textColor='inherit'
                    indicatorColor='secondary'
                    scrollButtons="auto"
                    variant='scrollable'
                    allowScrollButtonsMobile
                    sx={{ mx: 'auto', my:.75, borderBottom: `2px solid ${theme.palette.secondary}` }}
                    >

                    {/* Hot Swapping for page-specific tabbing -> ie. Messages, Project Tracking, Current Work, etc... */}
                    <Tab label="Currents" sx={{ fontFamily: theme.typography.fontFamily}} />
                    <Tab label="Messages" sx={{ fontFamily: theme.typography.fontFamily}} />
                    <Tab label="Tasks" sx={{ fontFamily: theme.typography.fontFamily}} />
                    <Tab label="Designation" sx={{ fontFamily: theme.typography.fontFamily}} />
                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
                <Typography sx={{color: 'white'}}>
                    Item Supposed to be Home
                </Typography> 
            </TabPanel>
            <TabPanel value={value} index={1}>
                <Typography sx={{color: 'white'}}>
                    Item Supposed to be Projects
                </Typography> 
            </TabPanel>
            <TabPanel value={value} index={2}>
                <Typography sx={{color: 'white'}}>
                    Item Supposed to be Teams
                </Typography> 
            </TabPanel>
            <TabPanel value={value} index={3}>
                <Typography sx={{color: 'white'}}>
                    Item Supposed to be Funding
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

export default Header;

