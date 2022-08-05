import React from 'react'
import { Typography, Box } from '@mui/material'
import { theme } from '../../../theme'

function DashSchedule() {
    return (
        <Box component="main" sx={{ flexGrow: 1, height: 100, display: 'flex'}}>
            <Typography sx={{color: theme.palette.primary.main}}>
                DashSchedule
            </Typography>
        </Box>
    )
}

export default DashSchedule;