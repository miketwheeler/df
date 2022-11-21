import React, { useEffect, useState } from 'react';

// Material ui Imports
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { Link, Stack, Paper, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Unstable_Grid2';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';


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
        event.preventDefault();
        setUsername(event.target.value);
    };
    const handlePWChange = (event) => {
        event.preventDefault();
        setPass(event.target.value);
    };
    const handleSignUpNav = (event) => {
        event.preventDefault();
        console.log('sign up link clicked')
    }

    return (
        <Paper 
            component='form'
            autoComplete='off'
            elevation={3} 
            sx={{
                width: '50%', 
                // border: `2px solid ${theme.palette.secondary.main}`, 
                borderRadius: '4px',
                p: 3,
                position: 'fixed',
                left: '50%',
                transform: 'translate(-50%, 50%)',
                textAlign: 'center'
                }}
            >
            <Stack spacing={3}>
                <Typography variant='h5'>login</Typography>
                <Grid container spacing={2}>
                    <Grid xs={12} display="flex" justifyContent="center" alignItems="center">
                        <TextField 
                            required
                            id='username-input'
                            label='username'
                            value={username}
                            onChange={handleUsernameChange}
                            variant='outlined'
                            />
                    </Grid>
                    <Grid xs={12} display="flex" justifyContent="center" alignItems="center">
                        <TextField
                            required
                            id='password-input'
                            label='password'
                            value={pass}
                            onChange={handlePWChange}
                            variant='outlined'
                            type='password'
                            InputLabelProps={{
                                classes: {
                                    root: theme.palette.secondary.dark,
                                    focused: 'white'
                                }
                            }}
                            />
                    </Grid>
                    <Grid xs={12} display="flex" justifyContent="center" alignItems="center">
                        <Link variant="body1" color="secondary" component='button' onClick={(e) => handleSignUpNav()}>
                            sign up
                        </Link>
                    </Grid>
                    <Grid xs={12} display="flex" justifyContent="center" alignItems="center">
                        <FormGroup sx={{display: 'flex'}}>
                            <FormControlLabel 
                                control={
                                    <Checkbox color='secondary' defaultChecked />
                                    } 
                                label="yes, recieve communications" 
                                />
                        </FormGroup>
                    </Grid>
                    <Grid xs={12} display="flex" justifyContent="center" alignItems="center">                        
                        <Button variant='contained' color="secondary">submit</Button>
                    </Grid>
                </Grid>
            </Stack>
        </Paper>
    )
    
}

export default LoginSignup;