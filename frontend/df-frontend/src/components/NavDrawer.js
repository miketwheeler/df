import * as React from 'react';
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
// import DashboardSectionTabs from './dashboard/Dashboard'
import CategoryIcon from '@mui/icons-material/Category';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import GridViewIcon from '@mui/icons-material/GridView';
import GroupsIcon from '@mui/icons-material/Groups';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import { Outlet } from 'react-router-dom';



const drawerWidth = 240;
const pagesTabLabels = ['Dashboard', 'Members Hall', 'Project Hub', 'Funding Tree']
const acctSpecLabels = ['Messages', 'Documents', 'News'];
const pagesIcons = [<GridViewIcon />, <GroupsIcon />, <CategoryIcon />, <AttachMoneyIcon />] 
const acctSpecIcons = [<MailIcon />, <HistoryEduIcon />, <NewspaperIcon />]


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
    const [open, setOpen] = React.useState(false);
    const [value, setValue] = React.useState(0);
    // const [anchorElUser, setAnchorElUser] = React.useState(null);
    const baseLtColor =  theme.palette.primary.main;
    const tabStyles = {
        color: theme.palette.primary.main,
        textTransform: 'none',
        minHeight: 48, 
        ml: '4px',
        minWidth: "fit-content",
        width: open ? drawerWidth : 0,
        // justifyContent: open ? "initial" : "center",
        // px: 'auto',
        // display: 'flex',
        // textAlign: open ? 'initial' : 'center',
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
                            sx={{ my: '.4rem', mx: 'auto', color: baseLtColor, ...(open && { display: 'none' }) }}
                            >
                            <MenuIcon />
                        </IconButton>
                        :
                        <IconButton onClick={handleDrawerClose}>
                            <CloseIcon sx={{ color: baseLtColor, my: '.4rem', mx: 'auto' }} />
                        </IconButton>
                    }
                <Divider />
                {/* Primary Navigation */}
                <Tabs
                    orientation="vertical" 
                    // scrollable 
                    value={value} 
                    onChange={handleChange} 
                    aria-label="vertical pages directory"
                    indicatorColor='secondary'
                    textColor="secondary"
                    >
                    {
                        pagesTabLabels.map((text, i) => (
                            <Tab
                                label={ open ? <Typography sx={{ m: '0 auto 0 1rem' }}>{ text }</Typography> : null } 
                                icon={ pagesIcons[i] } 
                                iconPosition="start" 
                                sx={tabStyles}
                                />
                        ))
                    }
                    <Divider />
                    {
                        acctSpecLabels.map((text, i) => (
                            <Tab
                                label={ open ? <Typography sx={{ m: '0 auto 0 1rem' }}>{ text }</Typography> : null } 
                                icon={ acctSpecIcons[i] } 
                                iconPosition="start" 
                                sx={tabStyles}
                                />
                        ))
                    }
                </Tabs>
            </Drawer>
            
            {/* Content in box below and to the right of the nav and  */}
            <Box component="main" sx={{ flexGrow: 1}}>
                <DrawerHeader />

                {/* Imported Header for the Homepage for now - need to swap this whole section on master tab *(far-left) selection */}
                {/* <DashboardSectionTabs /> */}
                {/* <Outlet /> */}

                {/* Placeholder for now - will not be necessary in the future */}
                {/* <Box component="div" sx={{ p:3 }}>
                    <Typography paragraph sx={{color: 'white'}}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua. Rhoncus dolor purus non
                        enim praesent elementum facilisis leo vel. Risus at ultrices mi tempus
                        imperdiet. Semper risus in hendrerit gravida rutrum quisque non tellus.
                        Convallis convallis tellus id interdum velit laoreet id donec ultrices.
                        Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl suscipit
                        adipiscing bibendum est ultricies integer quis. Cursus euismod quis viverra
                        nibh cras. Metus vulputate eu scelerisque felis imperdiet proin fermentum
                        leo. Mauris commodo quis imperdiet massa tincidunt. Cras tincidunt lobortis
                        feugiat vivamus at augue. At augue eget arcu dictum varius duis at
                        consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem donec massa
                        sapien faucibus et molestie ac.
                    </Typography>
                </Box> */}
            </Box>
        </Box>
    );
}