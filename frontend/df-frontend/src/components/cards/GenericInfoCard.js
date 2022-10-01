import React from 'react'
import Paper from '@mui/material/Paper'
import { Typography, Stack, Box, Divider, Chip } from '@mui/material';
import { HeadingThenData } from '../utility-components/HeadingThenData';

// import { useSelector } from 'react-redux'

const totalMilestones = '5';

const cardComponentStyles = {
    minHeight: '200px', 
    p: 2, 
    color: 'primary.main',
}
const invertedCardComponentStyles = {
    minHeight: '200px', 
    p: 2, 
    color: 'primary.main',
    border: '1px solid black',
    backgroundColor: 'black',
}




const GenericInfoCard = (props) => {

    // later will load-in state for displayed stats
    // const numContacts = useSelector((state) => state.memberIdListReducer.memberIdList)

    // const teamSlotsAvailable = props.total_team_count - props.current_team_count;

    return (
        <Paper sx={props.inverted ? invertedCardComponentStyles : cardComponentStyles} elevation={props.inverted ? 0 : 6} key={props.id}>
            {/* general stack to card */}
            <Stack spacing={1}>
                <Box sx={{flexGrow: 1, flexWrap: 'nowrap', justifyContent: 'space-between' }}>
                    <div style={{display: 'flex', flexDirection: 'row', alignContent: 'center', justifyContent: 'center'}}>
                        <Typography variant="subtitle1">
                            {/* test1 */}
                            { props.project_name }
                        </Typography>
                        <Typography variant="subtitle2" sx={{ml: 'auto', my: 'auto', opacity: '.6'}}>
                            {/* test2 */}
                            { props.project_type }
                        </Typography>

{/* This is a slot for an Icon - like the mini card, and adjacent to it's info */}
                        {/* <Typography sx={{my: 'auto', mx: 1, opacity: '.6'}}>
                            test3{/* {props.project_type} */}
                        {/* </Typography> */}
                    </div>
                </Box>
                <Divider orientation="horizontal" flexItem />
                <Stack spacing={1}>
{/* Heading then data list/stack */}
                    <HeadingThenData type={'datespan'} headingVal={'active: '} dataVal1={props.startdate} dataVal2={props.end_date} />{/* <HeadingThenData type={'datespan'} headingVal={'active: '} dataVal1={props.start_date} dataVal2={props.end_date} /> */}
                    <HeadingThenData type={'ratio'} headingVal={'current milestone: '} dataVal1={props.milestone} dataVal2={'5'} />{/* <HeadingThenData type={'ratio'} headingVal={'current milestone: '} dataVal1={props.milestone} dataVal2={totalMilestones} /> */}
                    <HeadingThenData headingVal={'funded: '} dataVal1={props.funded.toString()} />{/* <HeadingThenData headingVal={'funded: '} dataVal1={props.funded.toString()} /> */}
                    <HeadingThenData headingVal={'deployed: '} dataVal1={props.deployed.toString()} />{/* <HeadingThenData headingVal={'deployed: '} dataVal1={props.deployed.toString()} /> */}
                    <HeadingThenData headingVal={'stack: '} dataVal1={props.tech_stack} />
                    <HeadingThenData type={'ratio'} headingVal={'team slots: '} dataVal1={props.current_team_count} dataVal2={props.total_team_count} />
                </Stack>
                <Box sx={{flexGrow: 1}}>
                    <Stack spacing={1.25} sx={{my:2, mx: 'auto'}}>
                        {/* need to track @ redux - state for contacted members: currently props.dummyData for now */}

{/* ONLY include if need chips information */}
                        <Chip label={`total contacted: 3`} variant="outlined" sx={{color: 'inherit'}} />{/* <Chip label={`total contacted: ${props.current_team_count}`} variant="outlined" sx={{color: 'inherit'}} /> */}
                        <Chip label={`denied contacts: 140`} variant="outlined" sx={{color: 'inherit'}} />{/* <Chip label={`denied contacts: ${props.total_team_count}`} variant="outlined" sx={{color: 'inherit'}} /> */}
                        <Chip label={`contact requests: 143`} variant="outlined" sx={{color: 'inherit'}} />{/* <Chip label={`contact requests: ${props.total_team_count}`} variant="outlined" sx={{color: 'inherit'}} /> */}
                    </Stack>
                </Box>
{/* Lower line of content @end */}
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
                                // teamSlotsAvailable !== 0
                                // ?
                                `8 of 10`
                                // `${teamSlotsAvailable} of ${props.total_team_count}`
                                // :
                                // `[none]`
                            }
                        </Typography>
                    </div>
                </Box>
            </Stack>
        </Paper>
    )

}

export default GenericInfoCard;