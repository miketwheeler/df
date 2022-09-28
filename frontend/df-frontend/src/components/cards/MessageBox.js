import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Typography, Stack, Box, Paper, TextField, Button, Chip, Slide, Popper, Collapse, CardActionArea} from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup'
import { useSelector } from 'react-redux'
import { user_data } from '../../data/data_data';
import MessageIcon from '@mui/icons-material/Message';


const validateSchema = yup.object({
    message: yup
        .string("")
        .required(`you must have something to say...`)
})

const MessageBox = () => {
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
        '& label.Mui-focused': {
            color: 'secondary.main',
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: 'secondary.main',
        },
        '& .MuiOutlinedInput-root': {
            '&:hover fieldset': {
                borderColor: 'secondary.main',
            },
            '&.Mui-focused fieldset': {
                borderColor: 'secondary.main',
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
            elevation={6} 
            id={'member-button-card'} 
            onClick={() => handleMessageSelected()}
            >
            <Popper
                open={true}
                keepMounted 
                aria-labelledby="modal-title"
                aria-describedby="modal"
                >
                <Paper sx={cardComponent} elevation={18}>
                    {
                        expandValue === false 
                        ?
                        <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'nowrap', justifyContent: 'center'}}>
                            <Typography variant="subtitle1" id="modal-title">
                                select members to dispatch message
                            </Typography>
                            <MessageIcon sx={{my: 'auto', ml: '4px'}} />
                        </div>
                        :
                        null
                    }
                    <Collapse in={expandValue}>
                        <form onSubmit={formik.onSubmit}>
                            <Stack spacing={2} pb={2}>
                                <Typography variant="subtitle1" id="modal-title">
                                    dispatch message to group
                                </Typography>
                                <Box sx={{flexGrow: 1}}>
                                    {
                                        contactsList.map((id) => 
                                            <Slide direction='left' in={id} mountOnEnter unmountOnExit container={containerRef.current}>
                                                <Chip label={`${user_data[id-1].user_name}`} sx={{m: .25}} />
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
                                    value={formik.values.message}
                                    onChange={formik.handleChange}
                                    onError={formik.touched.message && Boolean(formik.errors.message)}
                                    helperText={formik.touched.message && formik.errors.message}
                                    sx={buttonStyles}
                                    onClick={(e) => e.stopPropagation()}
                                    />
                            </Stack> 
                            <Box sx={{ flexGrow: 1, width: '100%', flexDirection: 'row' }}> 
                                <Button 
                                    color='primary' 
                                    vaiant='contained' 
                                    type='submit' 
                                    sx={{ 
                                        textTransform: 'none', 
                                        backgroundColor: 'secondary.main', 
                                        '&:hover': { opacity: .5 }
                                    }}
                                    // onClick={(e) => handleSubmitButtonAction(e)}
                                    >
                                    send it
                                </Button>
                            </Box>
                        </form>
                    </Collapse>
                </Paper>
            </Popper>
        </CardActionArea>
    )
}

export default MessageBox;