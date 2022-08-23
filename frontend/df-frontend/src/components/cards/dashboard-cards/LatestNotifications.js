import React from 'react'
import Grid from '@mui/material/Unstable_Grid2'
import { Typography, Stack, Box, Divider, Fade, Paper} from '@mui/material';
import { 
    FaceRetouchingOff, 
    FaceRetouchingNatural,
} from '@mui/icons-material'
import Ava from '../../../static/images/avatar/2.png'
import { HeadingThenData } from '../../text-components/HeadingThenData';
import { SkillLevel } from '../../text-components/SkillLevel';
import { StarRatingComponent } from '../../text-components/StarRatingComponent';


// styles applied to the entire card container
const cardComponent = {
    height: 'fit-content', 
    minHeight: '140px', 
    // my: 2.6,
    color: 'primary.main',
    // minWidth: '300px',
    border: 'none',
    display: 'block',
}


const LatestNotifications = (props) => {

    // const user = props.user;

    return (
        <Paper sx={cardComponent} elevation={18} key={props.id} id={`card-${props.id}`} >
            <Fade in={true} timeout={600}>
                <Grid container >
                    <Grid xs={12} sx={{mx: 1}}>
                        <Stack spacing={1} sx={{height: '100%'}} >
                            LatestNotifications
                        </Stack>
                    </Grid>                    
                </Grid>
            </Fade>
        </Paper>
    )
}

export default LatestNotifications