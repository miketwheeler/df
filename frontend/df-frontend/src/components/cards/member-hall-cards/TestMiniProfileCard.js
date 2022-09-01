import React, { useEffect, useState, useMemo } from 'react'
// import { useTheme } from '@mui/material/styles';

import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Unstable_Grid2';
import { Typography, Stack, Box, Divider, CardActionArea, Fade } from '@mui/material';
import { FaceRetouchingOff, FaceRetouchingNatural } from '@mui/icons-material'
import Ava from '../../../static/images/avatar/2.png'
import { SpecialSwitch } from '../../small-components/SpecialSwitch';
// from the redux store
import { useSelector, useDispatch } from 'react-redux'
import { memberAdd, memberRemove } from '../../../slices/memberhallSlices/memberIdListSlice';
import { memberSelect } from '../../../slices/memberhallSlices/memberCardSelectSlice';
import { SkillLevel } from '../../text-components/SkillLevel';
import { StarRatingComponent } from '../../text-components/StarRatingComponent';
import { HeadingThenData } from '../../text-components/HeadingThenData';


const containerStyles = {
    flexGrow: 1,
}

const cardComponent = {
    height: 'fit-content', 
    minHeight: '140px', 
    p: 2,
    // maxHeight: '155px',
    color: 'primary.main',
    border: 'none',
    '&:hover': { boxShadow: '.5px .5px 3px 1px rgba(25,118,210, 1)' },
    '&.Mui-active': { boxShadow: '.5px .5px 3px 1px rgba(25,118,210, .8)' },
}
const availabilityIconStyles = { height: 20, color: 'green', my: 'auto', ml: .1 }
const unavailabilityIconStyles = { height: 20, my: 'auto', opacity: .3, ml: .1 }
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
    // maxHeight: '220px', 
    // maxWidth:'220px', 
    minHeight: '80px', 
    minWidth:'80px', 
    // height: '100%', 
    width: '100%', 
    margin: 'auto', 
    objectFit: 'scale-down',
}
const subtitle2Styles = { ml: 'auto', my: 'auto', opacity: '.6' }
const contentContStyles = { flexGrow: 1, flexDirection: 'row', justifyContent: 'space-between' }
const contentInteriorStyles = {display: 'flex', flexDirection: 'row', alignContent: 'center', justifyContent: 'center' }
const availabilityStyles = {display: 'flex', flexDirection: 'row', flexWrap: 'nowrap'}


const MyCard = (props) => {
    // const theme = useTheme();
    // gets / sets the state for the current member-card selected *(exploded view) or the current list of members to message
    const membersCheckBoxSelected = useSelector((state) => state.memberIdListReducer.memberIdList);
    const memberCardSelected = useSelector((state) => state.memberCardSelectedReducer.memberSelected);
    const dispatch = useDispatch();

    // const [selectedCardOpen, setSelectedCardOpen] = useState(false);
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
    //         console.log(`--card number ${selectedCardNum}`)
    // }, [selectedCardNum])

    const contentListA = [
        { head: 'specializes in: ', data: props.dev_type },
        { head: 'enrolled since: ', data: props.enroll_date },
        { head: 'teams on: ', data: props.teams },
        { head: 'region/state: ', data: props.state }
    ]
    

    return (
        <Box sx={containerStyles}>
            <Grid container spacing={2}>
                {/* Indiv member card selectable and a switch to cluster-message mult members @ once */}
                <CardActionArea 
                    elevation={6} 
                    id={'clickable-area-member-card'} 
                    onClick={() => handleProfileSelected(props.id)}
                    >

                    <Paper sx={cardComponent} elevation={6} key={props.id} id={`card-${props.id}`} >
                        <Grid container>
                            <Grid xs={memberCardSelected === props.id ? 12 : 9} md={memberCardSelected === props.id ? 9 : 9}>
                                <Stack spacing={1}>
                                    {/* Displays the firstname, username, devType, & availablity of this user*/}
                                    <Box sx={contentContStyles}>
                                        <div style={contentInteriorStyles}>
                                            <Typography variant="subtitle1">
                                                {props.first_name} ~ {props.user_name} 
                                            </Typography>
                                            <Box sx={{display: 'flex', flexDirection: 'row', flexWrap: 'nowrap', ml: 'auto', my: 'auto'}}>
                                                {
                                                    props.availability === true 
                                                    ? 
                                                    <div style={availabilityStyles}>
                                                        {
                                                            memberCardSelected === props.id
                                                            ? 
                                                            <Fade in={true} timeout={800}>
                                                                <Typography display={{xs: 'flex', md: 'none'}} variant="subtitle2" sx={subtitle2Styles}>
                                                                    available
                                                                </Typography>
                                                            </Fade>
                                                            : null
                                                        }
                                                        
                                                        <FaceRetouchingNatural sx={availabilityIconStyles} />
                                                    </div>
                                                    : 
                                                    <div style={availabilityStyles}>
                                                        {
                                                            memberCardSelected === props.id
                                                            ? 
                                                            <Fade in={true} timeout={2000}>
                                                                <Typography display={{xs: 'flex', md: 'none'}} variant="subtitle2" sx={subtitle2Styles}>
                                                                    N/A
                                                                </Typography>
                                                            </Fade>
                                                            : null
                                                        }
                                                        <FaceRetouchingOff sx={unavailabilityIconStyles} />
                                                    </div>
                                                }
                                                {
                                                    window.innerWidth < 900 ?
                                                    <SpecialSwitch 
                                                        label="select-user"
                                                        key={`${props.id}`}
                                                        id={`switch-${props.id}`}
                                                        onClick={(event) => { event.stopPropagation(); handleCardChecked(props.id)}}
                                                        onMouseDown={(event) => event.stopPropagation()}
                                                        />
                                                    : null
                                                }
                                            </Box>
                                        </div>
                                    </Box>
                                    <Divider orientation="horizontal" flexItem />
                                    {
                                        ((memberCardSelected === props.id) && (window.innerWidth < 900))
                                        ? 
                                        <Fade in={true} timeout={800}>
                                            <Grid container sx={{m: 0, p: 0}}>
                                                <Grid xs={5}>
                                                    <Stack spacing={1}>
                                                        {
                                                            contentListA.map((item, i) => 
                                                                <HeadingThenData id={`head-data-${i}`} headingVal={item.head} dataVal1={item.data} />
                                                            )
                                                        }
                                                    </Stack>
                                                </Grid>
                                                <Grid xs={7} sx={{display: 'flex', alignContent: 'center', p: 0, m: 0}}>
                                                    <Box sx={{flexGrow: 0, justifyContent: 'center', p: 1}}>
                                                        {/* Placeholder - get image from user irl */}
                                                        <img 
                                                            src={Ava} 
                                                            style={profilePicStyles} 
                                                            alt="profile-pic" 
                                                            />
                                                    </Box>
                                                </Grid>
                                                <Grid xs={12}>
                                                    <Box sx={rateSkillBoxStyles}>
                                                        <StarRatingComponent rating={props.rating} />
                                                        <SkillLevel skill_level={props.skill_level} />
                                                    </Box>
                                                    <Divider sx={{my: 2}} orientation="horizontal" flexItem />
                                                </Grid>
                                                <Grid xs={12}>
                                                    <Stack spacing={1}>
                                                        <Typography paragraph>
                                                            <HeadingThenData headingVal={`about: `} dataVal1={props.description} />
                                                        </Typography>
                                                        <Typography paragraph>
                                                            <Typography variant='subtitle2' sx={{opacity: .6}}>
                                                                skills: 
                                                            </Typography>
                                                            {
                                                                props.skills_list.map((i) => i !== props.skills_list[props.skills_list.length-1] ? `${i} | ` : `${i}`)
                                                            }
                                                        </Typography>
                                                    </Stack>
                                                </Grid>
                                            </Grid>
                                        </Fade>
                                        :
                                        <>
                                            <Box sx={{display: 'flex', flexDirection: 'column'}}> 
                                                <Typography variant='subtitle1'>{props.dev_type[0]}</Typography>
                                            </Box>
                                            <Box sx={{flexGrow: 1, my: 2, flexDirection: 'column', height: 'auto'}} />
                                            <Box sx={rateSkillBoxStyles}>
                                                <StarRatingComponent rating={props.rating} />
                                                <SkillLevel skill_level={props.skill_level} />
                                            </Box>
                                        </>
                                    }
                                </Stack>
                            </Grid>
                            {/* Right column - displays profile img and selection to cluster message */}
                            <Grid xs={3} sx={{display: 'flex', alignContent: 'flex-end', p: 0, m: 0, justifyContent: 'right'}}>
                                <Stack spacing={0}>
                                    <Box display={{xs: 'none', md: 'flex'}} sx={{ flexGrow: 1, ml: 'auto', float: 'right' }}>
                                        <SpecialSwitch 
                                            label="select-user"
                                            key={`${props.id}`}
                                            id={`switch-${props.id}`}
                                            onClick={(event) => { event.stopPropagation(); handleCardChecked(props.id)}}
                                            onMouseDown={(event) => event.stopPropagation()}
                                            />
                                    </Box>
                                    {/* Placeholder - get image from user inLR */}
                                    <Box 
                                        display={{
                                            // xs: window.innerWidth < 900 ? 'none' : 'flex',
                                            xs: 'flex',
                                            md: 'flex'
                                        }} 
                                        sx={{ 
                                            flexGrow: 0, 
                                            alignItems: 'center', 
                                            p: 1.5, 
                                            pt: 0,
                                            justifyContent: 'center',
                                            my: 'auto'
                                        }}>
                                        <img src={Ava} style={profilePicStyles} alt="profile-pic" />
                                    </Box>
                                </Stack>
                            </Grid>
                        </Grid>
                    </Paper>

                </CardActionArea>
            </Grid>
        </Box>
    )
}

export default MyCard;