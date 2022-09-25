import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Grid from '@mui/material/Unstable_Grid2';
import { Typography, Stack, Box, Divider, CardActionArea, useTheme, Paper, FormControlLabel, Collapse  } from '@mui/material';
import { FaceRetouchingOff, FaceRetouchingNatural } from '@mui/icons-material'

import Ava from '../../static/images/avatar/2.png';
import { HeadingThenData } from '../text-components/HeadingThenData';
import HeadingRow from '../../components/text-components/HeadingRow'

import { SpecialSwitch } from '../small-components/SpecialSwitch';
import { memberAdd, memberRemove } from '../../slices/memberhallSlices/memberIdListSlice';
import { memberSelect } from '../../slices/memberhallSlices/memberCardSelectSlice';
import { SkillLevel } from '../text-components/SkillLevel';
import { StarRatingComponent } from '../text-components/StarRatingComponent';



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
    maxHeight: '220px', 
    maxWidth:'220px', 
    minHeight: '80px', 
    minWidth:'80px', 
    height: '100%', 
    width: '100%', 
    margin: 'auto', 
    objectFit: 'scale-down',
}


const GenericProfileCard = (props) => {

    // later will load-in state for displayed stats
    // const numContacts = useSelector((state) => state.memberIdListReducer.memberIdList)
    const teamSlotsAvailable = props.total_team_count - props.current_team_count;

    const headingVals = {
        headingLeftVal: `${props.first_name} ~ ${props.user_name}`,
        headingRightVal: null,
        availability: props.availability
    }

    const theme = useTheme();
    // gets / sets the state for the current member-card selected *(exploded view) or the current list of members to message
    const membersCheckBoxSelected = useSelector((state) => state.memberIdListReducer.memberIdList);
    const memberCardSelected = useSelector((state) => state.memberCardSelectedReducer.memberSelected);
    const dispatch = useDispatch();
    
    const [selectedCardOpen, setSelectedCardOpen] = useState(false);
    const [selectedCardNum, setSelectedCardNum] = useState(-1);

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

    // useEffect(() => {
    //     if(selectedCardNum !== -1)
    //         console.log(`- - card number ${selectedCardNum}`)
    // }, [selectedCardNum])
    
    const [expandedCard, setExpandedCard] = useState(false);

    const handleExpandCard = () => {
        setExpandedCard(true);
    }


    return (
        <Box sx={{ flexGrow: 1, m: 0 }}>
            {/* <Grid container spacing={1}> */}
                {/* Indiv member card selectable and a switch to cluster-message mult members @ once */}
                <CardActionArea 
                    elevation={6} 
                    id={'member-button-card'} 
                    onClick={() => handleProfileSelected(props.id)}
                    >
                    <Paper sx={cardComponent} elevation={6} key={props.id} id={`card-${props.id}`} >
                        <Grid container>
                            <Grid xs={9}>
                                <Stack spacing={1}>
                                    <HeadingRow {...headingVals} />
                                    <Divider orientation="horizontal" flexItem />
                                    <Box sx={{display: 'flex', flexDirection: 'column'}}>
                                        <Typography variant='subtitle1'>{props.dev_type[0]}</Typography>
                                    </Box>
                                    {/* Gap placeholder */}
                                    <Box sx={{flexGrow: 1, my: 2, flexDirection: 'column', height: 'auto'}} />
                                    {/* Rating and Current Skill Level of this user */}
                                    <Box sx={rateSkillBoxStyles}>
                                        <StarRatingComponent rating={props.rating} />
                                        <SkillLevel skill_level={props.skill_level} />
                                    </Box>
                                </Stack>
                            </Grid>
                            {/* Right column - displays profile img and selection to cluster message */}
                            <Grid xs={3} sx={{display: 'flex', alignContent: 'flex-end', p: 0, m: 0, justifyContent: 'right'}}>
                                <Stack spacing={0}>
                                    <Box sx={{flexGrow: 1, ml: 'auto', float: 'right'}}>
                                        <SpecialSwitch 
                                            label="select-user"
                                            key={`${props.id}`}
                                            id={`switch-${props.id}`}
                                            onClick={(event) => { event.stopPropagation(); handleCardChecked(props.id)}}
                                            onMouseDown={(event) => event.stopPropagation()}
                                            />
                                    </Box>
                                    {/* Placeholder - get image from user inLR */}
                                    <Box sx={{flexGrow: 0, alignItems: 'center', p: 1.5, pt: 0 }}>
                                        <img src={Ava} style={profilePicStyles} alt="profile-pic" />
                                    </Box>
                                </Stack>
                            </Grid>
                        </Grid>
                    </Paper>
                </CardActionArea>
            {/* </Grid> */}
        </Box>
    )

}

export default GenericProfileCard;