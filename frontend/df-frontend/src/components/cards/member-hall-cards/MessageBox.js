import React, { useRef } from 'react'
import { Typography, Stack, Box, Paper, TextField, Button, Chip, Slide, Modal, Dialog, Popper} from '@mui/material';

import { useFormik } from 'formik';
import * as yup from 'yup'

import { useSelector } from 'react-redux'
import { user_data } from '../../../data/data_data'



const cardComponent = {
    height: 'fit-content', 
    minHeight: '140px', 
    p: 2,
    mb: 2,
    width: '100%',
    backgroundColor: 'primary.main',
    display: 'block',
    maxWidth: '400px',
    position: 'fixed',
    bottom: '10px',
    right: '10px',
    zIndex: '200'
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

const validateSchema = yup.object({
    message: yup
        .string("")
        .required(`you must have something to say...`)
})

const MessageBox = () => {
    const containerRef = useRef(null);
    const contactsList = useSelector((state) => state.memberIdListReducer.memberIdList)

    const formik = useFormik({
        initialValues: {},
        validationSchema: validateSchema,
        onSubmit: (value) => {
            alert(JSON.stringify(value, null, 1))
        }
    })

    return (
        <Popper
            open={true}
            keepMounted 
            disableEnforceFocus={true}
            hideBackdrop
            disableBackdropClick={true}
            aria-labelledby="modal-title"
            aria-describedby="modal"
            disableScrollLock={true}
            // disablePortal={true}
            // components={{Backdrop: 'none'}}
            >
            {/* // <Box sx={{flexGrow: 1, justifyContent: 'center', position: 'fixed', bottom: '10px', right: '10px'}}> */}
                <Paper sx={cardComponent} elevation={18}>
                    <form onSubmit={formik.onSubmit}>
                        <Stack spacing={2} pb={2}>
                            <Typography variant="subtitle1" id="modal-title">
                                dispatch to group
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
                                >
                                send it
                            </Button> 
                        </Box>
                    </form>
            </Paper>
            {/* // </Box> */}
        </Popper>
    )
}

export default MessageBox;