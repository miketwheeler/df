import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import Badge from '@mui/material/Badge';
import MailIcon from '@mui/icons-material/Mail';
import Notifications from '@mui/icons-material/Notifications'
// import AccountCircle from '@mui/icons-material/AccountCircle'
import { useTheme } from '@mui/material/styles'
// import AdbIcon from '@mui/icons-material/Adb';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';


// function TemporaryDrawer(props) {
//     const [state, setState] = React.useState({
//         left: false,
//     });

//     const toggleDrawer = (anchor, open) => (event) => {
//         if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
//             return;
//         }

//         setState({ ...state, [anchor]: open });
//     };

//     const list = (anchor) => (
//         <Box
//             sx={{ width: 250, color: 'white' }}
//             role="presentation"
//             onClick={toggleDrawer(anchor, false)}
//             onKeyDown={toggleDrawer(anchor, false)}
//             >
//             <List>
//                 {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
//                 <ListItem key={text} disablePadding>
//                     <ListItemButton>
//                         <ListItemIcon>
//                             {<MailIcon sx={{color: 'white'}} />}
//                         </ListItemIcon>
//                         <ListItemText primary={text} />
//                     </ListItemButton>
//                 </ListItem>
//                 ))}
//             </List>
//         <Divider />
//         </Box>
//     );

//     return (
//         <div>
//             {['left', 'right', 'top', 'bottom'].map((anchor) => (
//                 <React.Fragment key={anchor}>
//                     <Button sx={{color: 'red'}} onClick={toggleDrawer(anchor, true)}>{anchor}</Button>
//                         <Drawer
//                             anchor={anchor}
//                             open={state[anchor]}
//                             onClose={toggleDrawer(anchor, false)}
//                         >
//                         {list(anchor)}
//                     </Drawer>
//                 </React.Fragment>
//         ))}
//         </div>
//     );
// }

// //////////////////////////////////////////////////////////////////////////////////

const pages = ['Home', 'Projects', 'Teams', 'Funding'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const Appbar = ({extraStyles, leftShift}) => {
    const theme = useTheme();

    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    // sx={{paddingLeft: leftShift}}
    return (
        <AppBar position="fixed" sx={{...extraStyles}} >
            <Container maxWidth="xl" >
                <Toolbar disableGutters>
                {/* <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /> */}
                <Typography
                    variant="h4"
                    noWrap
                    component="a"
                    href="/"
                    sx={{
                        mr: 2,
                        display: { xs: 'none', md: 'flex' },
                        fontWeight: 700,
                        letterSpacing: '.3rem',
                        color: 'inherit',
                        textDecoration: 'none',
                    }}
                    >
                    dev foyer
                </Typography>

                <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                    <IconButton
                        size="large"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleOpenNavMenu}
                        color="inherit"
                        >
                        <MenuIcon />
                    </IconButton>
                    {/* <TemporaryDrawer id='menu-appbar' /> */}
                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorElNav}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                        open={Boolean(anchorElNav)}
                        onClose={handleCloseNavMenu}
                        sx={{
                            display: { xs: 'block', md: 'none' },
                            color: theme.palette.primary
                        }}
                        >
                        {
                            pages.map((page) => (
                                <MenuItem key={page} onClick={handleCloseNavMenu}>
                                    <Typography textAlign="center">{page}</Typography>
                                </MenuItem>
                            ))
                        }
                    </Menu>
                </Box>
                {/* <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} /> */}
                <Typography
                    variant="h5"
                    noWrap
                    component="a"
                    href=""
                    sx={{
                        mr: 2,
                        display: { xs: 'flex', md: 'none' },
                        flexGrow: 1,
                        fontWeight: 700,
                        letterSpacing: '.3rem',
                        color: 'inherit',
                        textDecoration: 'none',
                    }}
                >
                    dev foyer
                </Typography>

                {/* spacer for opposing sided-content */}
                <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex'}}} />

                {/* Navigation links ((?? REMOVE ??)) */}
                {/* <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                    {
                        pages.map((page) => (
                            <Button
                                key={page}
                                onClick={handleCloseNavMenu}
                                sx={{ my: 2, color: 'inherit', display: 'block' }}
                                >
                                {page}
                            </Button>
                        ))
                    }
                </Box> */}

                <Box sx={{ flexGrow: 0 }}>
                    <Stack spacing={4} direction="row" sx={{ color: 'action.active', alignItems: 'center' }}>
                        <Badge color="secondary" badgeContent={1} showZero>
                            <MailIcon />
                        </Badge>
                        <Badge color="secondary" badgeContent={0}>
                            <Notifications />
                        </Badge>
                        <Box sx={{ flexGrow: 0 }}>
                            <Tooltip title="Open settings">
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                    <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
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
                                            <Typography textAlign="center">{setting}</Typography>
                                        </MenuItem>
                                    ))
                                }
                            </Menu>
                        </Box>
                    </Stack>
                </Box>

                {/* <Box sx={{ flexGrow: 0 }}>
                    <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                        <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                    </IconButton>
                    </Tooltip>
                    <Menu
                        sx={{ mt: '45px' }}
                        id="menu-appbar"
                        anchorEl={anchorElUser}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={Boolean(anchorElUser)}
                        onClose={handleCloseUserMenu}
                        >
                    {settings.map((setting) => (
                        <MenuItem key={setting} onClick={handleCloseUserMenu}>
                        <Typography textAlign="center">{setting}</Typography>
                        </MenuItem>
                    ))}
                    </Menu>
                </Box> */}
                </Toolbar>
            </Container>
        </AppBar>
    );
};
export default Appbar;