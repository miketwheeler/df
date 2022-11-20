import React, { useEffect, useState } from 'react';

// Material ui Imports
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Container from '@mui/material/Container'
import IconButton from '@mui/material/IconButton';
import ava from '../static/images/avatar/2.png'
import { FormControl, TextField } from '@mui/material';
import Button from '@mui/material/Button';

const formFieldStyles = {
    root: {
        border: 'solid 3px lightblue',
        // '& label.Mui-focused': { color: 'lightblue' },
        // '& .MuiInput-border': { borderColor: 'lightblue' },
        '& .MuiOutlinedInput': { 
            '& fieldset': {
                borderColor: 'lightblue' 
            },
            '&:hover fieldset': {
                borderColor: 'lightblue'
            },
            '&.Mui-focused fieldset': {
                borderColor: 'lightblue'
            }
        }
    }
}


const LoginSignup = ({props}) => {
    const theme = useTheme();
    const [loggedIn, setLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [username, setUsername] = useState(null);
    const [pass, setPass] = useState(null);

    const handleUsernameChange = (event) => {
        event.preventDefualt();
        setUsername(event.target.value);
    };
    const handlePWChange = (event) => {
        event.preventDefualt();
        setPass(event.target.value);
    };

    return (
        <Box 
            component='form'
            autoComplete='off' 
            sx={{
                width: '50%', 
                border: '1px solid lightblue', 
                borderRadius: '8px',
                p: 2,
                position: 'fixed',
                left: '50%',
                transform: 'translate(-50%, 50%)'
                }}
            >
            <Typography variant='h5' sx={{color: 'lightblue', mb: 1, ml: 2}}>login or sign up</Typography>
            <Box 
                sx={{
                    alignItems: 'center',
                    display: 'flex',
                    flexDirection: 'column'
                }}
                >
                <FormControl variand="standard" sx={{m:1}}>
                    <InputLabel htmlFor="component-simple">username</InputLabel>
                    <OutlinedInput id="component-simple" value={username} onChange={handleUsernameChange} />
                </FormControl>
                <FormControl variand="standard" sx={{m:1}}>
                    <InputLabel htmlFor="password">password</InputLabel>
                    <OutlinedInput id="password" value={pass} onChange={handlePWChange} />
                </FormControl>
            </Box>
            <Button variant='contained' sx={{backgroundColor: 'lightblue', float: 'right', mr: 2}}>submit</Button>
        </Box>
    )
    
}

export default LoginSignup;