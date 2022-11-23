import React from 'react'
import { useTheme, styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import Badge from '@mui/material/Badge';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import Notifications from '@mui/icons-material/Notifications'
import Container from '@mui/material/Container'
import MailIcon from '@mui/icons-material/Mail';
import IconButton from '@mui/material/IconButton';
import ava from '../static/images/avatar/2.png'
import Link from '@mui/material/Link';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';

import { useNavigate } from 'react-router-dom'


const userLinks = ['account', 'login'];

const titleStyles = { textDecoration: 'none', letterSpacing: '.1rem', color: 'inherit', fontWeight: 700 }

// const CustomLinkComponent = styled(Link)(({ theme }) => ({
//     '& .MuiTypography-root': {
//         '&:hover': {
//             color: theme.palette.secondary.main
//         }
//     },
// }))


function MainAppBar() {
    const theme = useTheme();
    const navigate = useNavigate();
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    
    //TODO: this needs to be a state value && set after auth'd !!!!!!!!!!!!!!!
    const [loggedIn, setLoggedIn] = React.useState(true); 
    
    const handleOpenUserMenu = (e) => {
        setAnchorElUser(e.currentTarget);
    };

    const handleCloseUserMenu = (e, linkto) => {
        navigate(linkto === 'account' ? `/${linkto}` : "/")
        setAnchorElUser(null);
    };

    const menuIconSet = (label) => {
        return(
            <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'nowrap', justifyContent: 'flex-start'}}>
                {
                    label === 'account' 
                    ? <AccountCircleIcon sx={{mr: 1}} /> 
                    : label === 'login' && !loggedIn 
                    ? <LoginIcon sx={{mr: 1}} /> 
                    : <LogoutIcon sx={{mr: 1}} />
                }
                { 
                    (label === 'account' || (label === 'login' && !loggedIn))
                    ? label 
                    : 'log out' 
                }
            </div>
        )
    }

    // const generateLink = (link) => {
    //     const buildLink = (linkToComponent) => {
    //         let component = null;

    //         switch(linkToComponent) {
    //             case 'account':
    //                 component = <CustomLinkComponent href='/account' underline='none'>account</CustomLinkComponent>
    //                 break;
    //             // case 'dashboard':
    //             //     component = <CustomLinkComponent href='/dashboard' underline='none'>dashboard</CustomLinkComponent>
    //             //     break;
    //             default:
    //                 component = <CustomLinkComponent href='/' underline='none'>login/logout</CustomLinkComponent>
    //                 break;
    //         }
            
    //         return component;
    //     }

    //     return (
    //         <Typography 
    //             textAlign="center"
    //             sx={{color: 'white'}}
    //             >
    //             { buildLink(link) }
    //         </Typography>
    //     )
    // }
    
    return (
        <AppBar  sx={{ zIndex: theme.zIndex.drawer + 1 }} id="top-appbar">
            <Container maxWidth="xl">
                <Toolbar >
                    <Typography 
                        variant="h4" 
                        noWrap 
                        component="a" 
                        href='/' 
                        sx={titleStyles}
                        >
                        dev foyer
                    </Typography>
                    <Box sx={{ flexGrow: 1 }}/>
                    <Box sx={{ flexGrow: 0 }}>
                        <Stack spacing={4} direction="row" sx={{ color: 'action.active', alignItems: 'center' }}>
                            <Badge color="secondary" badgeContent={1} showZero sx={{ display: { xs: 'none', sm: 'block' }, top: 8}}>
                                <MailIcon />
                            </Badge>
                            <Badge color="secondary" badgeContent={0} sx={{ display: { xs: 'none', sm: 'block' }, top: 8 }}>
                                <Notifications />
                            </Badge>
                            <Box sx={{ flexGrow: 0 }}>
                                <Tooltip title="open settings">
                                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                        <Avatar alt="Mikey Sharp" src={ava} sx={{height: 36, width: 36}} />
                                    </IconButton>
                                </Tooltip>
                                <Menu
                                    sx={{ mt: '45px' }}
                                    id="menu-appbar"
                                    anchorEl={anchorElUser}
                                    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                                    keepMounted
                                    transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                                    open={Boolean(anchorElUser)}
                                    onClose={(e) => handleCloseUserMenu(e)}
                                    >
                                    {
                                        userLinks.map((userLink) => (
                                            <MenuItem 
                                                key={`menu-item-${userLink}`} 
                                                onClick={(e) => handleCloseUserMenu(e, userLink)}
                                                >
                                                { menuIconSet(userLink) }
                                            </MenuItem>
                                        ))
                                    }
                                </Menu>
                            </Box>
                        </Stack>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    )
}

export default MainAppBar