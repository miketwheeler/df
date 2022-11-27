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
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


const LoginLogoutSignup = ({props}) => {
    const theme = useTheme();
    const location = useLocation();
    const navigator = useNavigate();

    const [loggedIn, setLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [username, setUsername] = useState(null);
    const [pass, setPass] = useState(null);
    const [passConfirm, setPassConfirm] = useState(null);

    const [formType, setFormType] = useState(props);

    const handleUsernameChange = (e) => {
        e.preventDefault();
        setUsername(e.target.value);
    };
    const handlePWChange = (e) => {
        e.preventDefault();
        setPass(e.target.value);
    };
    const handlePWConfirmChange = (e) => {
        e.preventDefault();
        setPassConfirm(e.target.value);
    };
    const handlePassConfirmChange = (e) => {
        e.preventDefault();
        setPassConfirm(e.target.value);
    };
    const handleSignupSelected = (e) => {
        e.preventDefault();
        setFormType("signup")
        console.log('sign up link clicked')
    }

    // submits either a login cred (rtkq -> backend then to users dash) || signup cred (rtkq -> backend) then to profile for more data
    const handleSubmit = (e, ft) => {
        // e.preventDefault();
        if(ft === 'login') {
            navigator('/dashboard')
        } else {
            return null;
        }
    } 

    return (
        <Paper 
            component='form'
            autoComplete='off'
            elevation={3}
            onSubmit={(e) => handleSubmit(e, formType)} 
            sx={{
                maxWidth: 400,
                minWidth: 300,
                borderRadius: '4px',
                px: 3,
                py: 4,
                position: 'fixed',
                left: '50%',
                transform: 'translate(-50%, 50%)',
                textAlign: 'center'
                }}
            >
            <Stack spacing={3}>
                <Typography variant='h4'>
                    { formType === 'signup' ? 'sign up' : 'log in' }
                </Typography>
                <Grid container spacing={2}>
                    <Grid xs={12} display="flex" justifyContent="center" alignItems="center">
                        <TextField 
                            required
                            id='username-input'
                            label='username/email'
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
                            />
                    </Grid>
                    <Grid xs={12} display="flex" justifyContent="center" alignItems="center">
                        <TextField
                            required
                            id='password-confirm-input'
                            label='confirm password'
                            value={passConfirm}
                            onChange={handlePWConfirmChange}
                            variant='outlined'
                            type='password'
                            />
                    </Grid>
                    {
                        formType === 'signup'
                        ? 
                        <>
                            <Grid xs={12} display="flex" justifyContent="center" alignItems="center">
                                <TextField 
                                    required
                                    id='password-confirmation'
                                    label='confirm password'
                                    value={passConfirm}
                                    onChange={handlePassConfirmChange}
                                    variant='outlined'
                                    type="password"
                                    />
                            </Grid>
                        </>
                        : null
                    }
                    
                    <Grid xs={12} display="flex" justifyContent="center" alignItems="center">
                        <Stack spacing={1}>
                            <div style={{ display: 'flex', flexDirection: 'row', flextWrap: 'nowrap', justifyContent: 'center'}}>
                                <Typography variant="body1">new here?&nbsp; &nbsp; </Typography>
                                <Link 
                                    variant="body1" 
                                    color="secondary" 
                                    component='button' 
                                    onClick={(e) => handleSignupSelected(e)}
                                    >
                                    sign up
                                </Link>
                            </div>
                            {
                                formType === 'signup'
                                ?
                                <FormGroup sx={{display: 'flex'}}>
                                    <FormControlLabel 
                                        control={ <Checkbox color='secondary' defaultChecked /> } 
                                        label="yes, recieve communications"
                                        />
                                </FormGroup>
                                : null
                            }
                        </Stack>
                    </Grid>
                    <Grid xs={12} display="flex" justifyContent="center" alignItems="center">                        
                        <Button variant='contained' type="submit" color="secondary">
                            {
                                formType === 'signup'
                                ? 'sign up'
                                : 'login'
                            }
                        </Button>
                    </Grid>
                </Grid>
            </Stack>
        </Paper>
    )
    
}

export default LoginLogoutSignup;