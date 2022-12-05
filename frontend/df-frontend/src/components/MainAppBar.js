import React, { useEffect, useState } from 'react'
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

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';

import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';

import { logOut } from '../features/auth/authSlice';


const titleStyles = { textDecoration: 'none', letterSpacing: '.1rem', color: 'inherit', fontWeight: 700 };


const MainAppBar = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const [anchorElUser, setAnchorElUser] = useState(null);

    const dispatch = useDispatch();
    const inactiveUser = useSelector((state) => !state.auth.user);    
    const [loggedIn, setLoggedIn] = useState(true); 

    useEffect(() => {
        if(!inactiveUser)
            setLoggedIn(true);
    }, [inactiveUser]);
    
    const handleOpenUserMenu = (e) => {
        setAnchorElUser(e.currentTarget);
    };

    const handleCloseUserMenu = (e, linkto) => {
        // e.preventDefault();
        if(linkto === 'logout') {
            dispatch(logOut());
            setLoggedIn(false);
            navigate('/login');
        }
        else { 
            navigate(`/${linkto}`) 
        }
        setAnchorElUser(null);
    };



    const menuIconSet = (label) => {
        return(
            <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'nowrap', justifyContent: 'flex-start'}}>
                {
                    label === 'account' 
                    ? <AccountCircleIcon sx={{mr: 1}} /> 
                    : label === 'login' 
                    ? <LoginIcon sx={{mr: 1}} /> 
                    : <LogoutIcon sx={{mr: 1}} />
                }
                { 
                    label === 'account' ? 'account' : label === 'login' ? 'login' : 'log out' 
                }
            </div>
        )
    }
    
    return (
        <AppBar  sx={{ zIndex: theme.zIndex.drawer + 1, boxShadow: '1px 1px 8px 1px #2d2d2d' }} id="top-appbar">
            <Container maxWidth="xl">
                <Toolbar >
                    <Typography variant="h4" noWrap component="a" href='/' sx={titleStyles}>
                        dev foyer
                    </Typography>
                    <Box sx={{ flexGrow: 1 }}/> {/* this is the spacer */}
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
                                    id="appbar-user-menu"
                                    anchorEl={anchorElUser}
                                    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                                    transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                                    keepMounted
                                    open={Boolean(anchorElUser)}
                                    onClose={(e) => handleCloseUserMenu(e)}
                                    >
                                    <MenuItem 
                                        key={'menu-item-account'} 
                                        onClick={(e) => handleCloseUserMenu(e, 'account')}
                                        >
                                        { menuIconSet('account') }
                                    </MenuItem>
                                    {
                                        loggedIn && anchorElUser
                                        ?
                                        <MenuItem 
                                            key={'menu-item-logout'} 
                                            onClick={(e) => handleCloseUserMenu(e, 'logout')}
                                            >
                                            { menuIconSet('logout') }
                                        </MenuItem>
                                        :
                                        <MenuItem 
                                            key={'menu-item-login'} 
                                            onClick={(e) => handleCloseUserMenu(e, 'login')}
                                            >
                                            { menuIconSet('login') }
                                        </MenuItem>
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