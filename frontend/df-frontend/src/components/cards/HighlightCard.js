import React from 'react'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid';
import { Typography, Stack, Box, Divider, Chip } from '@mui/material';
// import { 
//     Star,
//     FaceRetouchingOff, 
//     FaceRetouchingNatural,
//     Favorite,
//     FavoriteBorder,
//     WorkspacePremium,
//     GroupAdd,
//     // SensorOccupied,

// } from '@mui/icons-material'
// import { theme } from '../../theme'
// import Ava from '../../static/images/avatar/2.png'



const cardComponent = {
    height: 'fit-content', 
    minHeight: '200px', 
    p: 2, m: 2, 
    color: 'primary.main',
    minWidth: '268px'
}


function HighlightCard(props) {

    const teamSlotsAvailable = props.total_team_count - props.current_team_count;

    return (
        <Paper sx={cardComponent} elevation={6} key={props.id}>
            <Grid container>
                <Grid item xs={12}>
                    <Stack spacing={1}>
                        <Box sx={{flexGrow: 1, flexWrap: 'nowrap', justifyContent: 'space-between' }}>
                            <div style={{display: 'flex', flexDirection: 'row', alignContent: 'center', justifyContent: 'center'}}>
                                <Typography variant="subtitle1">
                                    {props.project_name}
                                </Typography>
                                <Typography variant="subtitle2" sx={{ml: 'auto', my: 'auto', opacity: '.6'}}>
                                    {props.dev_type}
                                </Typography>
                                <Typography sx={{height: 20, my: 'auto', mx: 1,}}>
                                    {props.project_type}
                                </Typography>
                            </div>
                        </Box>
                        <Divider orientation="horizontal" flexItem />
                        <Box sx={{display: 'flex', flexDirection: 'column'}}>
                            <Typography variant='h8'>active: {props.start_date}-{props.end_date}</Typography>
                            <Typography variant='h8'>current milestone: {props.milestone}</Typography>
                            <Typography variant='h8'>funded: {props.funded.toString()}</Typography>
                            <Typography variant='h8'>deployed: {props.deployed.toString()}</Typography>
                        </Box>
                        <Box sx={{flexGrow: 1}}>
                            <Stack spacing={.5} sx={{my: 2, mx: 4}}>
                                {/* need to track @ redux - state for contacted members: currently props.dummyData for now */}
                                <Chip label={`total contacted: ${props.current_team_count}`} variant="outlined" sx={{color: 'inherit'}} />
                                <Chip label={`denied contacts: ${props.total_team_count}`} variant="outlined" sx={{color: 'inherit'}} />
                                <Chip label={`contact requests: ${props.total_team_count}`} variant="outlined" sx={{color: 'inherit'}} />
                            </Stack>
                        </Box>
                        <Box sx={{
                            flexGrow: 1, 
                            display: 'flex',
                            flexDirection: 'row', 
                            flexWrap: 'noWrap', 
                            justifyContent: 'flex-end',
                            }}
                            >
                            <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'nowrap', height: '20px'}}>
                                <Typography sx={{fontSize: '.8em', flexWrap: 'nowrap', opacity: '.6', mr: .6}}>
                                    enrollment slots available
                                </Typography>
                                <Typography sx={{fontSize: '.8em'}}>
                                    {
                                        teamSlotsAvailable !== 0
                                        ?
                                        `${teamSlotsAvailable} of ${props.total_team_count}`
                                        :
                                        `[none]`
                                    }
                                </Typography>
                            </div>
                        </Box>
                    </Stack>
                </Grid>
            </Grid>
        </Paper>
    )

}

export default HighlightCard