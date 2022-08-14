import React, { useMemo, useRef, useState, useCallback, createRef } from 'react'
import { Typography, Stack, Box, Paper, Grid, TextField, Button} from '@mui/material';
import { 
    Star,
    FaceRetouchingOff, 
    FaceRetouchingNatural,
    Favorite,
    FavoriteBorder,
    WorkspacePremium,
} from '@mui/icons-material'
import { theme } from '../../theme'

import { useFormik } from 'formik';
import * as yup from 'yup'


import { useSelector } from 'react-redux'
import { user_data } from '../../data/data_data'



const cardComponent = {
    height: 'fit-content', 
    minHeight: '140px', 
    p: 2,
    my: 2,
    color: 'primary.main',
    minWidth: '300px',
    border: 'none',
    display: 'block',
}

const buttonStyles = {
    color: 'primary.main',
    '& label': {
        color: 'primary.main'
    },
    '& label.Mui-focused': {
        color: 'secondary.main',
    },
    '& .MuiInput-underline:after': {
        borderBottomColor: 'secondary.main',
    },
    '& .MuiOutlinedInput-root': {
        '& .MuiInputBase-inputMultiline': {
            color: 'primary.main',
        },
        '& fieldset': {
            borderColor: 'primary.main',
        },
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
        .required(`don't be blank`)
})


const MessageBox = () => {

    const formik = useFormik({
        initialValues: {
            message: ''
        },
        validationSchema: validateSchema,
        onSubmit: (values) => {
            alert(JSON.stringify(values, null, 1))
        }
    })

    return (
        <Paper sx={cardComponent} elevation={18}>
            <Box sx={{flexGrow: 1, justifyContent: 'center'}}>
                <form onSubmit={formik.handleSubmit}>
                    <Stack spacing={2} pb={2}>
                        <Typography variant="subtitle1">
                            dispatch message
                        </Typography>
                        <TextField 
                            fullWidth 
                            id='quick-message' 
                            name='quick-message' 
                            label=' message'
                            multiline
                            required
                            value={formik.values.message}
                            onChange={formik.handleChange}
                            onError={formik.touched.message && Boolean(formik.errors.message)}
                            helperText={formik.touched.message && formik.errors.message}
                            sx={buttonStyles}
                            />
                    </Stack> 
                    <Box sx={{ flexGrow: 1, w: '100%', flexDirection: 'row' }}> 
                        <Button 
                            color='primary' 
                            vaiant='contained' 
                            type='submit' 
                            sx={{ textTransform: 'none', backgroundColor: '#1976d2' }}
                            >
                            send it
                        </Button> 
                    </Box>
                </form>
            </Box>
        </Paper>
    )
}

export default MessageBox;