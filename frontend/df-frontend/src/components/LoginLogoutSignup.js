import React, { useEffect, useState } from 'react';

// Material ui Imports
import { useTheme } from '@mui/material/styles';
import { 
    Link, Stack, Paper, FormControl, 
    InputAdornment, InputLabel, OutlinedInput, 
    IconButton, Button, FormGroup, FormControlLabel,
    Checkbox, Typography, Divider, Box,
} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

import { useLocation, useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../features/auth/authApiSlice';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../features/auth/authSlice';



const containerStyles = { 
    maxWidth: 400,
    minWidth: 300,
    borderRadius: '4px',
    px: 3,
    py: 4,
    position: 'fixed',
    left: '50%',
    transform: 'translate(-50%, 50%)',
    textAlign: 'center'
}


const LoginLogoutSignup = ({props}) => {
    const theme = useTheme();
    const location = useLocation();
    const navigate = useNavigate(); 
    const [loginUser, { isLoading, error }] = useLoginMutation();
    // const [signinUser, { isLoading, error }] = useSignupMutation();
    const dispatch = useDispatch();


    const [usernameEmail, setUsernameEmail] = useState("");
    const [pass, setPass] = useState("");
    const [passConfirm, setPassConfirm] = useState("");
    // signup + above
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    const [showPw, setShowPw] = useState(false);
    const [formType, setFormType] = useState(props);



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
    const handleMouseDownPassword = (e) => {
        e.preventDefault();
    };
    const handlePWConfirmChange = (e) => {
        e.preventDefault();
        setPassConfirm(e.target.value);
    };
    const handleBackButton = (e) => {
        navigate('/login')
        setFormType('login')
    }
    const handleSignupSelected = (e) => {
        // e.preventDefault();
        navigate('/signup')
        setFormType('signup')
    }

    // submits either a login cred (rtkq -> backend then to users dash) || signup cred (rtkq -> backend) then to profile for more data
    const handleSubmit = async (e, ft) => {
        e.preventDefault();
        if(ft === 'login') {
            try {
                const { data }  = await loginUser({
                    "email": usernameEmail, 
                    "password": pass
                })

                if(!error) {
                    dispatch(setCredentials(data));
                    navigate('/dashboard');
                }
            } catch (error) {
                console.log(`There was an error loggin in there --> ${error}`);
            }
            
        } else {
            try {
                // const { data } = await signupUser({
                //     //firstName, lastName, email, password, passwordConfirm <-- these are the keys in order
                //     "firstName": firstName,
                //     "lastName": lastName,
                //     "email": usernameEmail,
                //     "password": pass,
                //     "passwordConfirm": passConfirm
                // })
            } catch (error) {
                console.log(`There was an error signing up there --> ${error}`);
            }
        }
    } 

    return (
        <Paper 
            component='form'
            autoComplete='off'
            elevation={ 3 }
            onSubmit={ (e) => handleSubmit(e, formType) } 
            sx={ containerStyles }
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
                    <Grid 
                        xs={12} 
                        display="flex" 
                        justifyContent="center" 
                        alignItems="center"
                        >
                        <FormControl 
                            sx={{ width: '25ch' }} 
                            variant="outlined" 
                            required
                            >
                            <InputLabel htmlFor="email">
                                username/email
                            </InputLabel>
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
                                            { showPw ? <VisibilityOff /> : <Visibility /> }
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        </FormControl>
                    </Grid>
                    {
                        formType === 'signup'
                        ? 
                        <>
                            <Grid xs={12} display="flex" justifyContent="center" alignItems="center">
                                <FormControl sx={{ width: '25ch' }} variant="outlined" required>
                                    <InputLabel htmlFor="confirm-password">
                                        confirm password
                                    </InputLabel>
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
                                        label="password"
                                    />
                                </FormControl>
                            </Grid>
                            <Grid xs={12} display="flex" justifyContent="center" alignItems="center">
                                <Box flexGrow={1}>
                                    <Divider sx={{color: theme.palette.primary.main}} variant="middle" />
                                </Box>
                            </Grid>
                            <Grid xs={12} display="flex" justifyContent="center" alignItems="center">
                                <FormControl sx={{ width: '25ch' }} variant="outlined" required>
                                    <InputLabel htmlFor="first name">
                                        first name
                                    </InputLabel>
                                    <OutlinedInput
                                        id="first-name"
                                        type={'text'}
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                        label="first name"
                                    />
                                </FormControl>
                            </Grid>
                            <Grid xs={12} display="flex" justifyContent="center" alignItems="center">
                                <FormControl sx={{ width: '25ch' }} variant="outlined" required>
                                    <InputLabel htmlFor="last-name">
                                        last name
                                    </InputLabel>
                                    <OutlinedInput
                                        id="last-name"
                                        type={'text'}
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                        label="last name"
                                    />
                                </FormControl>
                            </Grid>
                        </>
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
                        <Button  variant='contained' type='submit' color="secondary">
                            {
                                formType === 'signup'
                                ? 'create my account'
                                : 'log in'
                            }
                        </Button>
                    </Grid>
                </Grid>
            </Stack>
        </Paper>
    )
    
}

export default LoginLogoutSignup;