import React from 'react'
import { Typography,  Box, } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2'
import MiniProfileSlide from '../../cards/member-hall-cards/MiniProfileSlide';
import { user_data as data } from '../../../data/data_data';


const containerStyles = {
    flexGrow: 1, 
    py: 1.25,
}

const textBoxStyle = {
    width: '100%',
    display: 'flex', 
    flexDirection: 'row', 
    flexWrap: 'nowrap', 
    justifyContent: 'space-between'
}

const subheadingText = {
    float: 'right',
    opacity: .6, 
    fontSize: '1em', 
    mt: 'auto',
}


function CenterColumn(props) {

    return (
        <Box sx={containerStyles}>
            <Grid container spacing={2}>
                <Grid xs={12}>
                    <Box sx={textBoxStyle}>
                        <Typography variant='h6'>
                            outreach
                        </Typography>
                        <Typography sx={subheadingText}>
                            select
                        </Typography>
                    </Box>
                </Grid>
                <Grid xs={12}>
                    {
                        data.map((user, i) => (
                            user ? <MiniProfileSlide key={i} {...user} /> : null
                        ))
                    }
                </Grid>
            </Grid>
        </Box>
    )
}

export default CenterColumn;