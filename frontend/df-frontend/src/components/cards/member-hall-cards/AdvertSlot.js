import React from 'react'
import { Typography,Box } from '@mui/material';


const component = { 
    height: 'auto',
    minHeight: '280px', 
    background: '#7d7d7d7d',
    width: '96%',
    color: 'black',
    p: 2,
    m: 'auto',
    '&:hover': {
        boxShadow: '.5px .5px 3px 1px #1976d2'
    }
}


function AdvertSlot(props) {
    return (
        <Box sx={component}>
            <Typography variant="h8">Advertisement</Typography>
        </Box>
    )

}

export default AdvertSlot