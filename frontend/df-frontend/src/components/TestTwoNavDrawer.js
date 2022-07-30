import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiTab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
// import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
// import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import Header from './Header'

import CategoryIcon from '@mui/icons-material/Category';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import GridViewIcon from '@mui/icons-material/GridView';
import GroupsIcon from '@mui/icons-material/Groups';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import TestAppBar from './TestAppBar';
import { Button, Icon } from '@mui/material';
import { Container } from '@mui/system';

import TabUnstyled, { tabUnstyledClasses } from '@mui/base/TabUnstyled';
import { buttonUnstyledClasses } from '@mui/base/ButtonUnstyled';



const drawerWidth = 240;
const pagesIconList = [<GridViewIcon sx={{color: 'white'}} />, <GroupsIcon sx={{color: 'white'}} />, <CategoryIcon sx={{color: 'white'}} />, <AttachMoneyIcon sx={{color: 'white'}} />];
const secondaryIconList = [<MailIcon sx={{color: 'white'}} />, <HistoryEduIcon sx={{color: 'white'}} />, <NewspaperIcon sx={{color: 'white'}} />];

const allTabLabels = ['Dashboard', 'Members', 'Projects', 'Funding', 'Messages', 'Documents', 'News'];
const allIcons = [<GridViewIcon sx={{color: 'white'}} />, <GroupsIcon sx={{color: 'white'}} />, <CategoryIcon sx={{color: 'white'}} />, <AttachMoneyIcon sx={{color: 'white'}} />, <MailIcon sx={{color: 'white'}} />, <HistoryEduIcon sx={{color: 'white'}} />, <NewspaperIcon sx={{color: 'white'}} />]

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
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
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

// const StyledTab = styled(MuiTab, )

export default function NavDrawer() {
    // const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    // const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    // const Lister = (icon, label) => {
    //     return(
    //         <ListItem id={value} autoFocus disablePadding sx={{ display: 'block', border: 'none', p:0, m:0 }}>
    //             <ListItemButton sx={{ minHeight: 48, justifyContent: open ? 'initial' : 'center', px: 2.5}}>
    //                 <ListItemIcon sx={{ minWidth: 0, mr: open ? 3 : 'auto', justifyContent: 'center' }}>
    //                     { icon }
    //                 </ListItemIcon>
    //                 <ListItemText sx={{ opacity: open ? 1 : 0, color: 'white'}}>
    //                     { label }
    //                 </ListItemText>
    //             </ListItemButton>
    //         </ListItem>
    //     )
    // }

    const TabComponent = (i, icon, label) => {
        return(
            <MyTabInner value={i}>
                <MyTabInnerButton>
                    <MyTabInnerIcon>
                        {icon}
                    </MyTabInnerIcon>
                </MyTabInnerButton>
                <MyTabInnerText>
                    {label}
                </MyTabInnerText>
            </MyTabInner>
        )
    }
    
    const MyTabInner = styled('button')(({theme}) => ({
        display: 'block',
        border: 'none',
        background: theme.palette.background.paper,
        "&:focus": {
            borderRight: `3px solid ${theme.palette.secondary}`,

        }
    }))
    const MyTabInnerButton = styled('button')(({theme}) => ({
        minHeight: 48,
        justifyContent: open ? 'initial' : 'center',
        px: 2.5,
        color: 'white',
        border: 'none',
        background: theme.palette.background.paper
    }))
    const MyTabInnerIcon = styled('button')(({theme}) => ({
        minWidth: 0,
        mr: open ? 3 : 'auto',
        justifyContent: 'center',
        border: 'none',
        background: theme.palette.background.paper
    }))
    const MyTabInnerText = styled('span')(({theme}) => ({
        opacity: open ? 1 : 0,
        color: 'white',
    }))

    // const getTheLabel = (label) => {
    //     return (
    //         <Typography sx={{opacity: open ? 1 : 0, color: 'white'}}>
    //             {label}
    //         </Typography>
    //     )
    // }
    // const getTheIcon = (icon) => {
    //     return (
    //         <IconButton sx={{ minWidth: 0, mr: open ? 3 : 'auto', justifyContent: 'center'  }} >
    //             { icon }
    //         </IconButton>
    //     )
    // }

    // const handleOpenUserMenu = (event) => {
    //     setAnchorElUser(event.currentTarget);
    // };

    // const handleCloseUserMenu = () => {
    //     setAnchorElUser(null);
    // };

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            
            {/* Imported Customized Appbar */}
            <TestAppBar />

            {/* <Box sx={{ display: 'flex' }}>
            <CssBaseline /> */}
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
                        sx={{
                            my: '10px',
                            // marginRight: 5,
                            mx: 'auto',
                            color: 'white',
                            ...(open && { display: 'none' }),
                        }}
                        >
                        <MenuIcon />
                    </IconButton>
                    :
                    <IconButton onClick={handleDrawerClose}>
                            {/* {theme.direction === 'rtl' ? <ChevronRightIcon sx={{color: 'white'}} /> : <ChevronLeftIcon sx={{color: 'white'}} />} */}
                            {/* <ChevronLeftIcon sx={{color: 'white', my: '10px', mx: 'auto'}} /> */}
                            <CloseIcon sx={{color: 'white', my: '10px', mx: 'auto'}} />
                    </IconButton>
                }
                <Divider />

                <Tabs
                    orientation="vertical" 
                    scrollable 
                    value={value} 
                    onChange={handleChange} 
                    aria-label="vertical pages directory"
                    indicatorColor='secondary'
                    // sx={{border}}
                    >
                    {
                        allTabLabels.map((text, i) => (
                            <Tab 
                                label={
                                    open ? text : null
                                } 
                                icon={allIcons[i]} 
                                iconPosition="start" 
                                iconWrapper={{
                                    minWidth: 0,
                                    // mr: open ? 3 : 'auto',
                                    alignSelf: 'center'
                                }}
                                sx={{ 
                                    color: 'white',
                                    textDecoration: 'none',
                                    minHeight: 48, 
                                    justifyContent: open ? "initial" : "center",
                                    px: open ? 2.5 : 0,
                                    display: 'block',
                                    width: open ? '80px' : "auto",
                                    p: 0,
                                    m: 0,
                                }}
                                />
                            
                            // <Tab 
                            //     key={text} 
                            //     component={() => TabComponent(value, allIcons[i], text)}
                            //     >

                                
                            // {/* // <Tab */}
                            // {/* //     key={text} 
                            // //     disablePadding 
                            // //     sx={{ color: 'white' }}
                            // //     sx={{ color: 'white', justifyContent: 'left'  }}
                            // //     icon={allIcons[i]}
                            // //     label={text}
                            // //     iconPosition="start"
                            // //     iconWrapper={{minWidth: 0, mr: open ? 3 : 'auto', justifyContent: 'center'}}
                            // //     component={() => Lister(allIcons[i], text)}
                                
                            // //     iconPosition="start"
                            // //     icon={getTheIcon(allIcons[i])}
                            // //     label={getTheLabel(text)} 
                            // //     >  */}

                            //     {/* <Box key={text} disablePadding sx={{ display: 'block' }}> */}
                            //         {/* <Box
                            //             sx={{
                            //                 minHeight: 48,
                            //                 justifyContent: open ? 'initial' : 'center',
                            //                 px: 2.5,
                            //                 color: 'white'
                            //             }}
                            //             > */}
                            //             {/* <IconButton
                            //                 sx={{
                            //                     minWidth: 0,
                            //                     mr: open ? 3 : 'auto',
                            //                     justifyContent: 'center',
                            //                 }}
                            //                 >
                            //                 { allIcons[i] }
                            //             </IconButton>
                            //             <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} /> */}
                            //         {/* </Box> */}
                            //     {/* </Box> */}
                            // // </Tab>
                        ))
                    }

                </Tabs>
                {/* <List>
                {['Dashboard', 'Members', 'Projects', 'Funding'].map((text, index) => (
                    <ListItem key={text} disablePadding sx={{ display: 'block' }}>
                        <ListItemButton
                            sx={{
                                minHeight: 48,
                                justifyContent: open ? 'initial' : 'center',
                                px: 2.5,
                                color: 'white'
                            }}
                            >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: open ? 3 : 'auto',
                                    justifyContent: 'center',
                                }}
                                >
                                { pagesIconList[index] }
                            </ListItemIcon>
                            <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
                        </ListItemButton>
                    </ListItem>
                ))}
                </List>
                <Divider />
                <List>
                {['Messages', 'Documents', 'News'].map((text, index) => (
                    <ListItem key={text} disablePadding sx={{ display: 'block' }}>
                        <ListItemButton
                            sx={{
                                minHeight: 48,
                                justifyContent: open ? 'initial' : 'center',
                                px: 2.5,
                                color: 'white'
                            }}
                            >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: open ? 3 : 'auto',
                                    justifyContent: 'center',
                                }}
                                >
                                { secondaryIconList[index] }
                            </ListItemIcon>
                            <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
                        </ListItemButton>
                    </ListItem>
                ))}
                </List> */}
            </Drawer>
            
            {/* Content in box below and to the right of the nav and  */}
            <Box component="main" sx={{ flexGrow: 1}}>
                <DrawerHeader />

                {/* Imported Header for the Homepage for now - need to swap this whole section on master tab *(far-left) selection */}
                <Header />

                {/* Placeholder for now - will not be necessary in the future */}
                <Box component="div" sx={{ p:3 }}>
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
                </Box>
            </Box>
        </Box>
    );
}