import * as React from 'react';
import { useState } from "react";
import { styled, alpha, useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import useMediaQuery from '@mui/material/useMediaQuery';
// import { StickyNote2Outlined } from '@mui/icons-material';
import { useWindowResize } from './WindowResized';

import { theme } from '../theme'


const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    border: `1px solid ${theme.palette.background.paper}`,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        border: `1.25px solid ${theme.palette.background.paper}`
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        // padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));


function SearchBar(props) {
    const theme = useTheme();
    const [anchorElUser, setAnchorElUser] = useState(null);
    const [searchBarTopVal, setSearchBarTopVal] = useState(64)

    let topVal = document.getElementById("top-appbar");

    const matchesSmDown = useMediaQuery(theme.breakpoints.down('sm'));
    const matchesSmUp = useMediaQuery(theme.breakpoints.up('sm'));

    const dynamicTopStyle = {
        ...matchesSmDown && { top: 55 },
        ...matchesSmUp && { top: 64 }
    }

    // console.log(`topVal-searchbar: ${topVal}`)
    React.useMemo(() => {
        setSearchBarTopVal(topVal);
    }, [topVal])

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <AppBar position="sticky" sx={{...dynamicTopStyle}}>
            <Toolbar 
                variant='dense' 
                sx={{ 
                    px: 2, 
                    height: 53, 
                    backgroundColor: theme.palette.primary.main, 
                    color: 'black',
                    // position: 'sticky',
                    // top: WindowResized.width > 900 ? 64 : 55
                }} 
                disableGutters={true}
                >
                <Typography
                    variant="h6"
                    noWrap
                    component="div"
                    sx={{ display: { xs: 'none', sm: 'block' } }}
                    >
                    {props.title}
                </Typography>
                <Box flexGrow={1} />
                <Box sx={{ flexGrow: 0 }}>
                    <Tooltip title="Filter">
                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                            <FilterListIcon />
                        </IconButton>
                    </Tooltip>
                    <Menu
                        sx={{ my: 'auto' }}
                        id="menu-appbar"
                        // anchorEl={anchorElUser}
                        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                        keepMounted
                        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                        // open={Boolean(anchorElUser)}
                        // onClose={handleCloseUserMenu}
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
                {/* <MenuItem >
                    <FilterListIcon />
                </MenuItem> */}
                <Search>
                    <SearchIconWrapper>
                        <SearchIcon />
                    </SearchIconWrapper>
                    <StyledInputBase
                        placeholder="Search…"
                        inputProps={{ 'aria-label': 'search' }}
                    />
                </Search>
            </Toolbar>
        </AppBar>
    );
}

export default SearchBar;