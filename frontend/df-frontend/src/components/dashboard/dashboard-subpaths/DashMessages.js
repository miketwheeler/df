import React from 'react'
import { Typography, Box } from '@mui/material'
import { theme } from '../../../theme'

function DashMessages() {
    return (
        <Box component="main" sx={{ flexGrow: 1, height: 100, display: "flex"}}>
            <Typography sx={{color: theme.palette.primary.main }}>
                DashMessages
            </Typography>
        </Box>
    )
}

export default DashMessages;