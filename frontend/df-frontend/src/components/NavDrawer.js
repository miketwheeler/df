import * as React from 'react';
import { useState, useMemo } from 'react'
import { styled, useTheme } from '@mui/material/styles';
import AppBar from './AppBar';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import MailIcon from '@mui/icons-material/Mail';
import CategoryIcon from '@mui/icons-material/Category';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import GridViewIcon from '@mui/icons-material/GridView';
import GroupsIcon from '@mui/icons-material/Groups';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import { Link, Outlet, useLocation } from 'react-router-dom';



const drawerWidth = 240;
const pagesTabLabels = ['dashboard', 'member hall', 'project hub', 'funding tree']
const acctSpecLabels = ['messages', 'documents', 'news'];
const pagesIcons = [<GridViewIcon />, <GroupsIcon />, <CategoryIcon />, <AttachMoneyIcon />] 
const acctSpecIcons = [<MailIcon />, <HistoryEduIcon />, <NewspaperIcon />]
const navRoutes = ["dashboard", "member-hall", "project-hub", "funding-tree", "my-messages", "my-documents", "news"]


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
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar, // necessary for content to be below app bar
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);


export default function NavDrawer() {
    const theme = useTheme();
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(0);
    
    const location = useLocation();
    const [pathValue, setPathValue] = useState("dashboard");

    const baseLightColor =  theme.palette.primary.main;
    const tabStyles = {
        color: theme.palette.primary.main,
        textTransform: 'none',
        minHeight: 48, 
        ml: '4px',
        minWidth: "fit-content",
        width: open ? drawerWidth : 0,
    }

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    useMemo(() => {
        setPathValue(location.pathname.split('/')[1]);
        let pathToValue = navRoutes.indexOf(pathValue)
        setValue(pathToValue !== value ? pathToValue : value);
    }, [location.pathname, value, pathValue])

    // ///////////////////////////////////////////
    // passed (*for now to indicate the user type)
    const roleProp = 'dev';
    // ///////////////////////////////////////////


    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            
            {/* Imported Customized Appbar */}
            <AppBar />

            <Drawer variant="permanent" open={open}>
                <DrawerHeader />
                    {
                        !open
                        ?
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            edge="start"
                            sx={{ my: '.4rem', mx: 'auto', color: baseLightColor, ...(open && { display: 'none' }) }}
                            >
                            <MenuIcon />
                        </IconButton>
                        :
                        <IconButton onClick={handleDrawerClose}>
                            <CloseIcon sx={{ color: baseLightColor, my: '.4rem', mx: 'auto' }} />
                        </IconButton>
                    }
                <Divider />
                
                {/* Primary Navigation */}
                <Tabs
                    orientation="vertical" 
                    value={value} 
                    onChange={handleChange} 
                    aria-label="vertical pages directory"
                    indicatorColor='secondary'
                    textColor="secondary"
                    >
                    {
                        pagesTabLabels.map((text, i) => (
                            text !== 'Funding Tree'
                            ?
                            <Tab 
                                id={ text }
                                label={ open ? <Typography sx={{ m: '0 auto 0 1rem' }}>{ text }</Typography> : null } 
                                icon={ pagesIcons[i] } 
                                iconPosition="start" 
                                sx={ tabStyles }
                                component={ Link }
                                to={ navRoutes[i] }
                                // onClick={() => handleChange(this.id)}
                                />
                            :
                            <Tab 
                                id={ text }
                                label={ open ? <Typography sx={{ m: '0 auto 0 1rem' }}>{ text }</Typography> : null } 
                                icon={ pagesIcons[i] } 
                                iconPosition="start" 
                                sx={ tabStyles }
                                disabled
                                // component={ Link }
                                // to={ navRoutes[i] }
                                // onClick={() => handleChange(this.id)}
                                />
                        ))
                    }
                    <Divider />
                    {
                        acctSpecLabels.map((text, i) => (
                            <Tab
                            id={text}
                                label={ open ? <Typography sx={{ m: '0 auto 0 1rem' }}>{ text }</Typography> : null } 
                                icon={ acctSpecIcons[i] } 
                                iconPosition="start" 
                                sx={ tabStyles }
                                component={ Link }
                                to={ navRoutes[i+3] }
                                />
                        ))
                    }
                </Tabs>
            </Drawer>
            
            <Box component="main" sx={{ flexGrow: 1}}>
                {/* Space Content in box below and to the right of the nav and right of Drawer */}
                <DrawerHeader />

                {/* Outlet is for each Primary-Nav Link  --> as listed inputs */}
                <Outlet roleType={roleProp} />

            </Box>
        </Box>
    );
}