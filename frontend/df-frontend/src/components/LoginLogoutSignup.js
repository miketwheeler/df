import React, { useEffect, useState } from 'react';

// Material ui Imports
import { useTheme } from '@mui/material/styles';
import { 
    Link, Stack, Paper, FormControl, 
    InputAdornment, InputLabel, OutlinedInput, 
    IconButton, Button, FormGroup, FormControlLabel,
    Checkbox, Typography
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Grid from '@mui/material/Unstable_Grid2';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../slices/auth/authApiSlice';


// import { devfoyerApi, useLoginMutation } from '../slices/api/devfoyerApi';


const LoginLogoutSignup = ({props}) => {
    const theme = useTheme();
    const location = useLocation();
    const navigator = useNavigate();

    const [loggedIn, setLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [usernameEmail, setUsernameEmail] = useState("");
    const [pass, setPass] = useState("");
    const [passConfirm, setPassConfirm] = useState("");
    const [showPw, setShowPw] = useState(false);

    const [formType, setFormType] = useState(props);

    // const [login, result] = useLoginMutation();
    // const { data, error, isLoading } = devfoyerApi.endpoints.useLoginMutation.mutation();
    const [loginUser, { isLoading, error }] = useLoginMutation()


    const handleUsernameEmailChange = (e) => {
        e.preventDefault();
        setUsernameEmail(e.target.value);
    };
    const handlePWChange = (e) => {
        e.preventDefault();
        setPass(e.target.value);
    };
    const handleClickShowPw = (e) => {
        e.preventDefault();
        setShowPw(!showPw);
    }
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const handlePWConfirmChange = (e) => {
        e.preventDefault();
        setPassConfirm(e.target.value);
    };
    const handleBackButton = (e) => {
        navigator('/login')
        setFormType('login')
    }
    const handleSignupSelected = (e) => {
        // e.preventDefault();
        navigator('/signup')
        setFormType('signup')
    }

    // submits either a login cred (rtkq -> backend then to users dash) || signup cred (rtkq -> backend) then to profile for more data
    const handleSubmit = (e, ft) => {
        // e.preventDefault();
        if(ft === 'login') {
            try {
                loginUser({ 
                    "email": usernameEmail, 
                    "password": pass
                })
                if (!error) {
                    // setUsernameEmail("");
                    // setPass("");
                    navigator('/dashboard')
                }
            } catch (error) {
                console.log(`There was an error loggin in there --> ${error}`)
            }
            
        } else {
            return null; // will be sign in route & form instead TODO: write handle
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
            {
                formType === 'signup'
                ?
                <div style={{ width: 'fit-content' }}>
                    <IconButton aria-label="navigate-back-to-login" color="secondary" onClick={handleBackButton}>
                        <ArrowBackIosIcon />
                    </IconButton>
                </div>
                : null
            }
            <Stack spacing={3}>
                <Typography variant='h4'>
                    { formType === 'signup' ? 'sign up' : 'log in' }
                </Typography>
                <Grid container spacing={2}>
                    <Grid xs={12} display="flex" justifyContent="center" alignItems="center">
                        <FormControl sx={{ width: '25ch' }} variant="outlined" required>
                            <InputLabel htmlFor="email">username/email</InputLabel>
                            <OutlinedInput
                                id="username-email"
                                type='text'
                                value={usernameEmail}
                                label="username/email"
                                onChange={handleUsernameEmailChange}
                            />
                        </FormControl>
                    </Grid>
                    <Grid xs={12} display="flex" justifyContent="center" alignItems="center">
                        <FormControl sx={{ width: '25ch' }} variant="outlined" required>
                            <InputLabel htmlFor="password">password</InputLabel>
                            <OutlinedInput
                                id="password"
                                type={showPw ? 'text' : 'password'}
                                value={pass}
                                label="password"
                                onChange={handlePWChange}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            color='secondary'
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPw}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                            >
                                            {showPw ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        </FormControl>
                    </Grid>
                    {
                        formType === 'signup'
                        ? 
                        <Grid xs={12} display="flex" justifyContent="center" alignItems="center">
                            <FormControl sx={{ width: '25ch' }} variant="outlined" required>
                                <InputLabel htmlFor="confirm-password">confirm password</InputLabel>
                                <OutlinedInput
                                    id="confirm-password"
                                    type={showPw ? 'text' : 'password'}
                                    value={passConfirm}
                                    onChange={handlePWConfirmChange}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                color='secondary'
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPw}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                                >
                                                {showPw ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                label="Password"
                                />
                            </FormControl>
                        </Grid>
                        : null
                    }
                    
                    <Grid xs={12} display="flex" justifyContent="center" alignItems="center">
                        <Stack spacing={1}>
                            {
                                // is login should display link to signup route
                                formType !== 'signup'
                                ?
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
                                : 
                                // else is signup and should ask about notifications
                                <FormGroup sx={{display: 'flex'}}>
                                    <FormControlLabel 
                                        control={ <Checkbox color='secondary' defaultChecked /> } 
                                        label="yes, recieve communications"
                                        />
                                </FormGroup>
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