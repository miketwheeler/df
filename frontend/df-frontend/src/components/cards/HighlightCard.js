import React from 'react'
import Paper from '@mui/material/Paper'
import { Typography, Stack, Box, Divider, Chip } from '@mui/material';
import { HeadingThenData } from '../text-components/HeadingThenData';

// import { useSelector } from 'react-redux'

const totalMilestones = '5';

const cardComponent = {
    minHeight: '200px', 
    p: 2, 
    color: 'primary.main',
}


function HighlightCard(props) {

    // later will load-in state for displayed stats
    // const numContacts = useSelector((state) => state.memberIdListReducer.memberIdList)

    const teamSlotsAvailable = props.total_team_count - props.current_team_count;

    return (
        <Paper sx={cardComponent} elevation={6} key={props.id}>
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
                <Stack spacing={1}>
                    <HeadingThenData type={'datespan'} headingVal={'active: '} dataVal1={props.start_date} dataVal2={props.end_date} />
                    <HeadingThenData type={'ratio'} headingVal={'current milestone: '} dataVal1={props.milestone} dataVal2={totalMilestones} />
                    <HeadingThenData headingVal={'funded: '} dataVal1={props.funded.toString()} />
                    <HeadingThenData headingVal={'deployed: '} dataVal1={props.deployed.toString()} />
                </Stack>
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
                    <div style={{display: 'flex', flexDirection: 'row'}}>
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
        </Paper>
    )

}

export default HighlightCard