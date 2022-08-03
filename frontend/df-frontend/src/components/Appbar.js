import React from 'react'
import { useTheme } from '@mui/material/styles';
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



const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];


function TestAppBar() {
    const theme = useTheme();
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    
    return (
        <AppBar position="fixed" sx={{ zIndex: theme.zIndex.drawer + 1 }}>
            <Container maxWidth="xl">
                <Toolbar >
                    <Typography 
                        variant="h4" 
                        noWrap 
                        component="a" 
                        href='/' 
                        sx={{ textDecoration: 'none', letterSpacing: '.1rem', color: 'inherit', fontWeight: 700 }}
                        >
                        dev foyer
                    </Typography>
                    <Box sx={{ flexGrow: 1 }}/>
                    <Box sx={{ flexGrow: 0 }}>
                        <Stack spacing={4} direction="row" sx={{ color: 'action.active', alignItems: 'center' }}>
                            <Badge color="secondary" badgeContent={1} showZero sx={{ display: { xs: 'none', sm: 'block' } }}>
                                <MailIcon />
                            </Badge>
                            <Badge color="secondary" badgeContent={0} sx={{ display: { xs: 'none', sm: 'block' } }}>
                                <Notifications />
                            </Badge>
                            <Box sx={{ flexGrow: 0 }}>
                                <Tooltip title="Open settings">
                                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                        <Avatar alt="Mikey Sharp" src={ava} />
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
                                    onClose={handleCloseUserMenu}
                                    >
                                    {
                                        settings.map((setting) => (
                                            <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                                <Typography textAlign="center" sx={{color: 'white'}}>{setting}</Typography>
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

export default TestAppBar