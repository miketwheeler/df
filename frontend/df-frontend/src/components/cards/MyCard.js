import React from 'react'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Unstable_Grid2';
import { Typography, Stack, Box, Divider, CardActionArea,Switch, styled } from '@mui/material';
import { FaceRetouchingOff, FaceRetouchingNatural } from '@mui/icons-material'
import Ava from '../../static/images/avatar/2.png'

// from the redux store
import { useSelector, useDispatch } from 'react-redux'
import { memberAdd, memberRemove } from '../../slices/memberhallSlices/memberIdListSlice';
import { memberSelect } from '../../slices/memberhallSlices/memberCardSelectSlice';
import { SkillLevel } from '../text-components/SkillLevel';
import { StarRatingComponent } from '../text-components/StarRatingComponent';


const containerStyles = {
    flexGrow: 1,
}

const cardComponent = {
    height: 'fit-content', 
    minHeight: '140px', 
    p: 2,
    color: 'primary.main',
    border: 'none',
    '&:hover': { boxShadow: '.5px .5px 3px 1px rgba(25,118,210, 1)' },
    '&.Mui-active': { boxShadow: '.5px .5px 3px 1px rgba(25,118,210, .8)' },
}

// Android 12 type switch - most borrowed from the MUI component docs, modified
const SpecialSwitch = styled(Switch)(({ theme }) => ({
    padding: 11,
    '& .MuiSwitch-track': {
        borderRadius: 22 / 2,
        '&:before, &:after': {
            content: '""',
            position: 'absolute',
            top: '50%',
            transform: 'translateY(-50%)',
            width: 12,
            height: 12
        },    
        '&:before': {
            backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="12" width="12" viewBox="-2 2 20 20"><path fill="${encodeURIComponent(
            theme.palette.getContrastText(theme.palette.primary.main))}" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
            left: 10
        },
        '&:after': { right: 10, },
    },
    '& .MuiSwitch-thumb': { boxShadow: 'none', width: 12, height: 12, margin: 4 },
    '& .MuiSwitch-switchBase.Mui-checked': { color: theme.palette.secondary.main, opacity: 1 },
    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { backgroundColor: theme.palette.secondary.main },
}));



function MyCard(props) {
    // gets / sets the state for the current member-card selected *(exploded view) or the current list of members to message
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
            dispatch(memberSelect(cardId))
        }
    }

    return (
        <Box sx={containerStyles}>
            <Grid container sx={{height: 'fit-content'}} spacing={2}>
                {/* Indiv member card selectable and a switch to cluster-message mult members @ once */}
                <CardActionArea 
                    elevation={6} 
                    id={'clickable-area-member-card'} 
                    onClick={() => handleProfileSelected(props.id)}
                    >
                    <Paper sx={cardComponent} elevation={6} key={props.id} id={`card-${props.id}`} >
                        <Grid container sx={{p: 0}}>
                            <Grid xs={9}>
                                <Stack spacing={1} sx={{height: '100%'}}>
                                    {/* Displays the firstname, username, devType, & availablity of this user*/}
                                    <Box sx={{flexWrap: 'nowrap', justifyContent: 'space-between' }}>
                                        <div style={{display: 'flex', flexDirection: 'row', alignContent: 'center', justifyContent: 'center'}}>
                                            <Typography variant="subtitle1">
                                                {props.first_name} ~ {props.user_name} 
                                            </Typography>
                                            <Box sx={{ml: 'auto', my: 'auto'}}>
                                                {
                                                    props.availability === true 
                                                    ? <FaceRetouchingNatural sx={{height: 20, color: 'green', my: 'auto', ml: .1}} /> 
                                                    : <FaceRetouchingOff sx={{height: 20, my: 'auto', ml: .1, opacity: .3}} />
                                                }
                                            </Box>
                                        </div>
                                    </Box>
                                    <Divider orientation="horizontal" flexItem />
                                    <Box sx={{display: 'flex', flexDirection: 'column'}}>
                                        <Typography variant='subtitle1'>{props.dev_type[0]}</Typography>
                                    </Box>
                                    {/* Gap placeholder */}
                                    <Box sx={{flexGrow: 1, my: 2, flexDirection: 'column', height: 'auto'}} />
                                    {/* Rating and Current Skill Level of this user */}
                                    <Box sx={{
                                        flexGrow: 1, 
                                        display: 'flex',
                                        alignContent: 'flex-end',
                                        flexDirection: 'row', 
                                        flexWrap: 'noWrap', 
                                        justifyContent: 'space-between',
                                        }}
                                        >
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
                                    <Box sx={{flexGrow: 0, alignItems: 'center',p: 1.5, pt: 0 }}>
                                        <img 
                                            src={Ava} 
                                            style={{
                                                display: 'flex',
                                                maxHeight: '90px', 
                                                maxWidth:'90px',
                                                height: '100%',
                                                width: '100%',
                                                // margin: 'auto',
                                                objectFit: 'scale-down',
                                            }} 
                                            alt="profile-pic" 
                                            />
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