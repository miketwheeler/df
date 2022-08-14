import React from 'react'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid';
import { Typography, Stack, Box, Divider, Chip } from '@mui/material';


const cardComponent = {
    // height: 'fit-content', 
    minHeight: '200px', 
    p: 2, 
    color: 'primary.main',
    // position: 'fixed',
    // display: 'block'
    // transition: 
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
                            <Typography variant='h8' sx={{wrap: 'nowrap'}}>
                                <Typography sx={{opacity: .6}}>
                                    active: 
                                </Typography>
                                {props.start_date}-{props.end_date}
                            </Typography>
                            <Typography variant='h8' sx={{display: 'flex', flexDirection: 'row', wrap: 'none'}}>
                                <Typography sx={{opacity: .6}}>
                                    current milestone: &nbsp;
                                </Typography>
                                {props.milestone} of 5
                            </Typography>
                            <Typography variant='h8'sx={{display: 'flex', flexDirection: 'row', wrap: 'none'}}>
                                <Typography sx={{opacity: .6}}>
                                    funded: &nbsp;
                                </Typography>
                                {props.funded.toString()}
                            </Typography>
                            <Typography variant='h8'sx={{display: 'flex', flexDirection: 'row', wrap: 'none'}}>
                                <Typography sx={{opacity: .6}}>
                                    deployed: &nbsp;
                                </Typography>
                                {props.deployed.toString()}
                            </Typography>
                        </Box>
                        <Box sx={{flexGrow: 1}}>
                            <Stack spacing={.5} sx={{my: 2, mx: 'auto'}}>
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
                            <div style={{display: 'flex', flexDirection: 'row', height: '20px'}}>
                                <Typography sx={{fontSize: '.8em', flexWrap: 'nowrap', opacity: '.6', mr: .6}}>
                                    enrollment slots available
                                </Typography>
                                <Typography sx={{fontSize: '.8em', flexWrap: 'nowrap'}}>
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