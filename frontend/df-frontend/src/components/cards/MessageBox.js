import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Typography, Stack, Box, Paper, TextField, Button, Chip, Slide, Popper, Collapse, CardActionArea, Fade} from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup'
import { useSelector } from 'react-redux'
import { user_data } from '../../data/data_data';
import MessageIcon from '@mui/icons-material/Message';
import { styled, useTheme } from '@mui/material/styles';


const validateSchema = yup.object({
    message: yup
        .string("")
        .required(`you must have something to say...`)
})

const MessageBox = () => {
    const theme = useTheme();
    const [expandValue, setExpandValue] = useState(false);
    const containerRef = useRef(null);
    const contactsList = useSelector((state) => state.memberIdListReducer.memberIdList);
    const listLen = contactsList.length;
    let prevListLen = 0;

    const cardComponent = {
        height: 'fit-content', 
        minHeight: '60px', 
        p: 2,
        mb: 2,
        width: '100%',
        backgroundColor: 'primary.main',
        display: 'block',
        maxWidth: '400px',
        position: 'fixed',
        bottom: '10px',
        right: '10px',
        zIndex: '200',
        borderRadius: expandValue === true ? '4px' : '50px 50px 0px 50px',
        '&:hover': { boxShadow: '1px 1px 3px 4px rgba(25,118,210, 1)' },
        '&.Mui-active': { boxShadow: '.5px .5px 3px 1px rgba(25,118,210, .8)' },
    }
    
    const buttonStyles = {
        '& .MuiInputLabel-root': {
            color: 'secondary.main'
        },
        '& .MuiInputLabel-shrink': {
            backgroundColor: 'primary.main'
        },
        '& .MuiFormLabel': {
            backgroundColor: 'primary.main'
        },
        color: 'secondary.main',
        '& label': {
            color: 'secondary.main'
        },
        '& label.Mui-focused': {
            color: 'secondary.main',
        },
        // '& .MuiInput-underline:after': {
        //     borderBottomColor: 'secondary.main',
        // },
        '& .MuiOutlinedInput-root': {
            borderColor: 'secondary.main',
            color: 'primary.dark',
            '&.Mui-focused fieldset': {
                borderColor: 'secondary.main',
                color: 'secondary.main'
            },
        },
    }

    const formik = useFormik({
        initialValues: {},
        validationSchema: validateSchema,
        onSubmit: (value) => {
            alert(JSON.stringify(value, null, 1))
        },
        handleSubmit: (e) => {
            e.preventDefualt();
            e.stopPropagation();
        }
    })

    useEffect(() => {
        if(listLen > 0 ) setExpandValue(true);
        else setExpandValue(false)
    }, [listLen, prevListLen])

    const handleMessageSelected = () => {
        setExpandValue(!expandValue);
    }

    // const handleSubmitButtonAction = (e) => {
    //     e.preventDefualt();
    //     e.stopPropagation();
    //     // setExpandValue(!expandValue)
    // }

    return (
        <CardActionArea 
            elevation={ 6 } 
            id={ 'member-button-card' } 
            onClick={ () => handleMessageSelected() }
            >
            <Popper
                open={ true }
                keepMounted 
                aria-labelledby="modal-title"
                aria-describedby="modal"
                
                >
                <Paper sx={ cardComponent } elevation={ 18 }>
                    {
                        expandValue === false 
                        ?
                        <Fade 
                            in={ !expandValue } 
                            timeout={{ enter: 700, exit: 10 }} 
                            easing={{ enter: 'ease-in-out' }}
                            >
                            <div 
                                style={{
                                    display: 'flex', 
                                    flexDirection: 'row', 
                                    flexWrap: 'nowrap', 
                                    justifyContent: 'center',
                                    color: theme.palette.primary.contrastText
                                }}
                                >
                                <Typography variant="subtitle1" id="modal-title">
                                    select members to dispatch message
                                </Typography>
                                <MessageIcon sx={{ my: 'auto', ml: '4px' }} />
                            </div>
                        </Fade>
                        :
                        null
                    }
                    <Collapse in={ expandValue } easing={{ enter: 'ease-in-out', exit: 'ease-in-out' }} timeout={{ enter: 200, exit: 200 }}>
                        <Fade in={ expandValue } timeout={{ enter: 200, exit: 10 }} easing={{ enter: 'ease-in-out' }}>
                            <form onSubmit={ formik.onSubmit }>
                                <Stack spacing={ 2 } pb={ 2 }>
                                    <Typography variant="subtitle1" id="modal-title" color={ theme.palette.primary.contrastText }>
                                        people to message
                                    </Typography>
                                    <Box sx={{ flexGrow: 1 }}>
                                        {
                                            contactsList.map((id) => 
                                                <Slide 
                                                    direction='left' 
                                                    in={id}
                                                    mountOnEnter 
                                                    unmountOnExit 
                                                    container={containerRef.current}
                                                    style={{ transitionDelay: '200ms' }}
                                                    >
                                                    <Chip 
                                                        label={ `${user_data[id-1].user_name}` } 
                                                        sx={{ m: .25, backgroundColor: theme.palette.primary.contrastText }} 
                                                        />
                                                </Slide>
                                            )
                                        }
                                    </Box>
                                    <TextField 
                                        fullWidth 
                                        id='quickMessage' 
                                        name='quick-message' 
                                        label='message'
                                        multiline
                                        required
                                        value={ formik.values.message }
                                        onChange={ formik.handleChange }
                                        onError={ formik.touched.message && Boolean(formik.errors.message) }
                                        helperText={ formik.touched.message && formik.errors.message }
                                        sx={ buttonStyles }
                                        onClick={ (e) => e.stopPropagation() }
                                        />
                                </Stack> 
                                <Box sx={{ flexGrow: 1, width: '100%', flexDirection: 'row' }}> 
                                    <Button 
                                        vaiant='contained' 
                                        type='submit' 
                                        sx={{ 
                                            color: 'primary',
                                            textTransform: 'none', 
                                            backgroundColor: 'secondary.main', 
                                            '& .MuiButton': {
                                                '&:hover': {
                                                    opacity: .5
                                                }
                                            }
                                        }}
                                        >
                                        send it
                                    </Button>
                                </Box>
                            </form>
                        </Fade>
                    </Collapse>
                </Paper>
            </Popper>
        </CardActionArea>
    )
}

export default MessageBox;