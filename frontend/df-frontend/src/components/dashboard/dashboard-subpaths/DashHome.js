import React from 'react'
import { Typography } from '@mui/material'
import { theme } from '../../../theme';
import Box from '@mui/material/Box';



function DashHome() {
    return (
        <Box component="main" sx={{ flexGrow: 1, height: 100, display: 'flex'}}>
            <Typography sx={{color: theme.palette.primary.main}}>
                DashHome
            </Typography>
        </Box>
    )
}

export default DashHome;