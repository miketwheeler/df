import React from 'react'
import { Typography, Box } from '@mui/material'
import { theme } from '../../../theme'

function DashTasks() {
    return (
        <Box component="main" sx={{ flexGrow: 1, height: 100, display: 'flex'}}>
            <Typography sx={{color: theme.palette.primary.main}}>
                DashTasks
            </Typography>
        </Box>
    )
}

export default DashTasks;