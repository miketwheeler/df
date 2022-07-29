import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import Appbar from './Appbar';
import Header from './Header';
import { styled, useTheme } from '@mui/material/styles';



const drawerWidth = 240;

const openedMixin = (theme) => ({
width: drawerWidth,
transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
}),
overflowX: 'hidden',
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
        }
    ),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
            width: `calc(${theme.spacing(8)} + 1px)`,
        },
    }
);

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    }
));


export default function NavDrawer() {

    const theme = useTheme();

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            {/* <Box position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }} > */}
            <Appbar extraStyles={{zIndex: (theme) => theme.zIndex.drawer + 1 }} leftShift={{drawerWidth}} />
            {/* </Box> */}
            {/* <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                <Toolbar>
                    <Typography variant="h6" noWrap component="div">
                        Clipped drawer
                    </Typography>
                </Toolbar>
            </AppBar> */}
            <Drawer
                variant="permanent"
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
                }}
                >
                <Toolbar />
                <Toolbar />
                <Divider />
                <Box sx={{ overflow: 'auto', color: 'white' }}>
                    <List>
                        {
                            ['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                                <ListItem key={text} disablePadding>
                                    <ListItemButton>
                                        <ListItemIcon>
                                            {index % 2 === 0 ? <InboxIcon sx={{color: 'white'}} /> : <MailIcon sx={{color: 'white'}} />}
                                        </ListItemIcon>
                                        <ListItemText primary={text} sx={{color: 'white'}} />
                                    </ListItemButton>
                                </ListItem>
                            ))
                        }
                    </List>
                    <Divider />
                    <List>
                        {
                            ['All mail', 'Trash', 'Spam'].map((text, index) => (
                                <ListItem key={text} disablePadding>
                                    <ListItemButton>
                                        <ListItemIcon>
                                            {index % 2 === 0 ? <InboxIcon sx={{color: 'white'}} /> : <MailIcon sx={{color: 'white'}} />}
                                        </ListItemIcon>
                                        <ListItemText primary={text} />
                                    </ListItemButton>
                                </ListItem>
                            ))
                        }
                    </List>
                </Box>
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, mt: 8}}>
                <Header extraStyles={{zIndex: (theme) => theme.zIndex.drawer + 1 }} leftShift={drawerWidth} />
            </Box>
        </Box>
    );
}