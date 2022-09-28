import React from 'react'
import Grid from '@mui/material/Unstable_Grid2';
import { useSelector, useDispatch } from 'react-redux';
import { Stack, Box, Divider, Fade, Paper, useTheme, Skeleton} from '@mui/material';
import Ava from '../../static/images/avatar/2.png'
import { HeadingThenData } from '../utility-components/HeadingThenData';
import HeadingRow from '../utility-components/HeadingRow';
import { SpecialSwitch } from '../utility-components/SpecialSwitch';
import { memberAdd, memberRemove } from '../../slices/memberhallSlices/memberIdListSlice';
import { memberSelect } from '../../slices/memberhallSlices/memberCardSelectSlice';
import { SkillLevel } from '../utility-components/SkillLevel';
import { StarRatingComponent } from '../utility-components/StarRatingComponent';
import { user_data } from '../../data/data_data';



// styles applied to the entire card container
const cardComponent = {
    height: 'fit-content', 
    minHeight: '140px', 
    // my: 2.6,
    p: 2,
    color: 'primary.main',
    // minWidth: '300px',
    border: 'none',
    display: 'block',
}
const rateSkillBoxStyles = { flexGrow: 1, display: 'flex', alignContent: 'flex-end', flexDirection: 'row', flexWrap: 'noWrap', justifyContent: 'space-between', my: 2 }
const profilePicStyles = { maxHeight: '220px', maxWidth:'220px', height: '100%', width: '100%', margin: 'auto', objectFit: 'scale-down' }


const StaticExpandedProfileCard = (props) => {
    const theme = useTheme();
    const membersCheckBoxSelected = useSelector((state) => state.memberIdListReducer.memberIdList);
    const memberCardSelected = useSelector((state) => state.memberCardSelectedReducer.memberSelected);
    const dispatch = useDispatch();
    
    const active_member = {...user_data[memberCardSelected - 1]}

    const headingVals = {
        headingLeftVal: `${active_member.first_name} ~ ${active_member.user_name}`,
        headingRightVal: null,
        availability: active_member.availability
    }

    function handleCardChecked(switchId) {
        membersCheckBoxSelected.includes(switchId) ? dispatch(memberRemove(switchId)) : dispatch(memberAdd(switchId))
    }

    return (
        <Paper sx={cardComponent} elevation={18} key={props.id} id={`card-${props.id}`} >
            <Fade in={true} timeout={600}>
                
                    {
                        memberCardSelected === -1
                        ?
                        <Box sx={{flexGrow: 1, alignContent: 'center'}}>
                            <Skeleton 
                                variant="rectangular" 
                                animation="wave" 
                                height={420} 
                                width={'100%'} 
                                sx={{borderRadius: 2}} 
                                />
                        </Box>
                        :
                        <>
                        <Grid container>
                            <Grid xs={12}>
                                <Stack spacing={1}>
                                    <HeadingRow {...headingVals} />
                                    <Divider orientation="horizontal" flexItem />
                                    <Grid container sx={{p:0, m:0}}>
                                        <Grid xs={9}>
                                            <HeadingThenData headingVal={'specialty: '} dataVal1={active_member.dev_type} />
                                            <Stack spacing={1} sx={{mt: 1}}>
                                                <HeadingThenData headingVal={'enrolled since: '} dataVal1={active_member.enroll_date} />
                                                <HeadingThenData headingVal={'teams on: '} dataVal1={active_member.teams} />
                                                <HeadingThenData headingVal={'region/state: '} dataVal1={active_member.state} />
                                            </Stack>
                                        </Grid>
                                        <Grid xs={3} sx={{display: 'flex', alignContent: 'flex-end', p: 0, m: 0, justifyContent: 'right'}}>
                                            <div style={{padding: 3}}>
                                                <img src={Ava} style={profilePicStyles} alt="profile-pic" />
                                            </div>
                                        </Grid>
                                    </Grid>
                                    <Box sx={{flexGrow: 1, my: 2, flexDirection: 'column', height: '100%'}} />
                                    <Box sx={rateSkillBoxStyles}>
                                        <StarRatingComponent rating={active_member.rating} />
                                        <SkillLevel skill_level={active_member.skill_level} />
                                    </Box>
                                </Stack>
                            </Grid>
                            
                            <Grid xs={12}>
                                <Divider orientation='horizontal' flexItem />
                                <Stack spacing={1} sx={{mt: 1}}>
                                    <HeadingThenData headingVal={'about: '} dataVal1={active_member.description} />
                                    <HeadingThenData headingVal={'skills: '} dataVal1={ active_member.skills_list.join(' | ') } />
                                </Stack>
                            </Grid>
                        </Grid>
                        </>

                    }
                
            </Fade>
        </Paper>
    )
}

export default StaticExpandedProfileCard;