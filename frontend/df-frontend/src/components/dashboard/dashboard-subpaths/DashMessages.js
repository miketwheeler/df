import React from 'react'
import { Typography } from '@mui/material'
import { theme } from '../../../theme'

function DashMessages() {
    return (
        <Typography sx={{color: theme.palette.primary.main}}>
            DashMessages
        </Typography>
    )
}

export default DashMessages