import React from 'react'
import { Grid, Typography,  Box, } from '@mui/material';
import { user_data as data } from '../../../data/data_data';
import MyCard from '../../cards/MyCard';


const textBoxStyle = {
    width: '100%',
    display: 'flex', 
    flexDirection: 'row', 
    flexWrap: 'nowrap', 
    justifyContent: 'space-between'
}

const subheadingText = {
    float: 'right',
    // px: 3, 
    opacity: .6, 
    fontSize: '1em', 
    mt: 'auto',
}


function LeftColumn(props) {

    return (
        <Box sx={{flexGrow: 1, px: 2, py: 4}}>
            <Grid container spacing={2}>
                <Box sx={textBoxStyle}>
                    <Typography variant='h5' >
                        outreach
                    </Typography>
                    <Typography sx={subheadingText}>
                        select
                    </Typography>
                </Box>
                {
                    data.map((user, i) => (
                        user ? <MyCard {...user} /> : null
                    ))
                }
            </Grid>
        </Box>
    )
}

export default LeftColumn;