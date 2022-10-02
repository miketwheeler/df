import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Grid from '@mui/material/Unstable_Grid2';
import { Stack, Box, Divider, CardActionArea, useTheme, Paper, Collapse, useMediaQuery  } from '@mui/material';

import Ava from '../../static/images/avatar/2.png';
import { HeadingThenData } from '../utility-components/HeadingThenData';
import HeadingRow from '../utility-components/HeadingRow'

import { SpecialSwitch } from '../utility-components/SpecialSwitch';
import { memberAdd, memberRemove } from '../../slices/memberhallSlices/memberIdListSlice';
import { memberSelect } from '../../slices/memberhallSlices/memberCardSelectSlice';
import { SkillLevel } from '../utility-components/SkillLevel';
import { StarRatingComponent } from '../utility-components/StarRatingComponent';



const cardComponent = {
    height: 'fit-content', 
    minHeight: '140px', 
    p: 2,
    color: 'primary.main',
    border: 'none',
    '&:hover': { boxShadow: '.5px .5px 3px 1px rgba(25,118,210, 1)' },
    '&.Mui-active': { boxShadow: '.5px .5px 3px 1px rgba(25,118,210, .8)' },
}
const rateSkillBoxStyles = { 
    flexGrow: 1, 
    display: 'flex', 
    alignContent: 'flex-end', 
    flexDirection: 'row', 
    flexWrap: 'noWrap', 
    justifyContent: 'space-between',
    my: 2,
}
const profilePicStyles = { 
    display: 'flex',
    maxHeight: '220px', 
    maxWidth:'220px', 
    minHeight: '60px', 
    minWidth:'60px', 
    height: '100%', 
    width: '100%', 
    objectFit: 'scale-down',
    overflow: 'none'
}

const GenericProfileCard = (props) => {

    const theme = useTheme();

    const headingVals = {
        headingLeftVal: `${props.first_name} ~ ${props.user_name}`,
        availability: props.availability
    }

    const [selectedCardNum, setSelectedCardNum] = useState(-1);
    const matchesMdDown = useMediaQuery(theme.breakpoints.down('md'))

    // state
    const membersCheckBoxSelected = useSelector((state) => state.memberIdListReducer.memberIdList);
    const memberCardSelected = useSelector((state) => state.memberCardSelectedReducer.memberSelected);
    const dispatch = useDispatch();

    // On selected - adds this member to the list to message plural or singular
    function handleCardChecked(switchId) {
        membersCheckBoxSelected.includes(switchId) ? dispatch(memberRemove(switchId)) : dispatch(memberAdd(switchId))
    }

    // If the current card is selected, ignore, else replace current exploded card with new selection, highlight selected
    const handleProfileSelected = (cardId) => {
        if(memberCardSelected !== cardId) {
            document.getElementById(`card-${cardId}`).classList.add("Mui-active");

            if(memberCardSelected !== -1) {
                document.getElementById(`card-${memberCardSelected}`).classList.remove("Mui-active");
            }            
            dispatch(memberSelect(cardId));
        }
        setSelectedCardNum(cardId);
    }

    return (
        <Box sx={{ flexGrow: 1, m: 0 }}>
            {/* Indiv member card selectable and a switch to cluster-message mult members @ once */}
            <CardActionArea 
                elevation={6} 
                id={'member-button-card'} 
                onClick={() => handleProfileSelected(props.id)}
                >
                <Paper sx={cardComponent} elevation={6} key={props.id} id={`card-${props.id}`}>
                    <Grid container>
                        <Grid xs={9}>
                            <Stack spacing={1}>
                                <HeadingRow {...headingVals} />
                                <Divider orientation="horizontal" flexItem />
                                <Grid xs={12}>
                                    <HeadingThenData headingVal={'specialty: '} dataVal1={props.dev_type} />
                                    <Collapse in={props.id === memberCardSelected && matchesMdDown}>
                                        <Stack spacing={1} sx={{mt: 1}}>
                                            <HeadingThenData headingVal={'enrolled since: '} dataVal1={props.enroll_date} />
                                            <HeadingThenData headingVal={'teams on: '} dataVal1={props.teams} />
                                            <HeadingThenData headingVal={'region/state: '} dataVal1={props.state} />
                                        </Stack>
                                    </Collapse>
                                </Grid>
                                {/* Gap placeholder */}
                                <Box sx={{flexGrow: 1, my: 2, flexDirection: 'column', height: '100%'}} />
                                {/* Rating and Current Skill Level of this user */}
                                <Box sx={rateSkillBoxStyles}>
                                    <StarRatingComponent rating={props.rating} />
                                    <SkillLevel skill_level={props.skill_level} />
                                </Box>
                            </Stack>
                        </Grid>
                        {/* Right column - displays profile img and selection to cluster message */}
                        <Grid xs={3} sx={{display: 'flex', alignContent: 'flex-end', p: 0, m: 0, justifyContent: 'right'}}>
                            <Box flexGrow={1}>
                                <Box sx={{flexGrow: 1, ml: 'auto', float: 'right', height: 'fit-content'}}>
                                    <SpecialSwitch 
                                        label="select-user"
                                        key={`${props.id}`}
                                        id={`switch-${props.id}`}
                                        onClick={(event) => { event.stopPropagation(); handleCardChecked(props.id)}}
                                        onMouseDown={(event) => event.stopPropagation()}
                                        />
                                </Box>
                                {/* Placeholder - get image from user inLR */}
                                <div style={{padding: 3}}>
                                    <img src={Ava} style={profilePicStyles} alt="profile-pic" />
                                </div>
                            </Box>
                        </Grid>
                        <Collapse in={props.id === memberCardSelected && matchesMdDown}>
                            <Grid xs={12}>
                                <Divider orientation='horizontal' flexItem />
                                <Stack spacing={1} sx={{mt: 1}}>
                                    <HeadingThenData headingVal={'about: '} dataVal1={props.description} />
                                    <HeadingThenData headingVal={'skills: '} dataVal1={ props.skills_list.join(' | ') } />
                                </Stack>
                            </Grid>
                        </Collapse>
                    </Grid>
                </Paper>
            </CardActionArea>
        </Box>
    )
}

export default GenericProfileCard;