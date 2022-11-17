import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Material ui Imports
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Badge from '@mui/material/Badge';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import Container from '@mui/material/Container'
import MailIcon from '@mui/icons-material/Mail';
import IconButton from '@mui/material/IconButton';
import ava from '../static/images/avatar/2.png'
import { FormControl, TextField } from '@mui/material';
import { ThemeContext } from '@emotion/react';


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

    const loginUser = () => {
        axios({
            method: 'GET',
            url: 'http://127.0.0.1:3030/api/v1/users/login',
        }).then((res) => {
            setUser(res.user)
        }).catch((err) => console.log(`There was an error logging in: ${err}`))
    }

    return (
        <Box component='form' autoComplete='off' sx={{width: '50%', height: '50%', border: '1px solid lightblue', borderRadius: '8px'}}>
            <FormControl variand="standard">
                {/* <TextField id="username" label="username" variant='outlined' value={() => setUsername()} margin='dense'> */}
                <InputLabel htmlFor="component-simple" sx={{color: 'lightblue'}}>username</InputLabel>
                <OutlinedInput id="component-simple" value={username} color='primary' onChange={handleUsernameChange} />
                {/* </TextField> */}
            </FormControl>
            <FormControl variand="standard">
                {/* <TextField id="username" label="username" variant='outlined' value={() => setUsername()} margin='dense'> */}
                <InputLabel htmlFor="pw" sx={{color: 'lightblue'}}>password</InputLabel>
                <OutlinedInput id="pw" value={pass} color='primary' onChange={handlePWChange} />
                {/* </TextField> */}
            </FormControl>
        </Box>
    )
    
}

export default LoginSignup;