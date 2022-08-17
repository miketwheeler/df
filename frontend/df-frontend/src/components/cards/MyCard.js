import React from 'react'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid';
import { Typography, Stack, Box, Divider, CardActionArea,Switch, styled } from '@mui/material';
import { FaceRetouchingOff, FaceRetouchingNatural } from '@mui/icons-material'
import Ava from '../../static/images/avatar/2.png'

// from the redux store
import { useSelector, useDispatch } from 'react-redux'
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

// Android 12 type switch - most borrowed from the MUI component docs, modified
const SpecialSwitch = styled(Switch)(({ theme }) => ({
    padding: 8,
    '& .MuiSwitch-track': {
        borderRadius: 22 / 2,
        '&:before, &:after': {
            content: '""',
            position: 'absolute',
            top: '50%',
            transform: 'translateY(-50%)',
            width: 16,
            height: 16,
        },    
        '&:before': {
            backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
            theme.palette.getContrastText(theme.palette.primary.main))}" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
            left: 12,
        },
        '&:after': { right: 12, },
    },
    '& .MuiSwitch-thumb': { boxShadow: 'none', width: 16, height: 16, margin: 2, },
    '& .MuiSwitch-switchBase.Mui-checked': { color: theme.palette.secondary.main, opacity: 1, },
    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { backgroundColor: theme.palette.secondary.main, },
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
        // Indiv member card selectable and a switch to cluster-message mult members @ once
        <CardActionArea 
            sx={{my: 2}}
            elevation={6} 
            id={'clickable-area-member-card'} 
            onClick={() => handleProfileSelected(props.id)}
            >
            <Paper sx={cardComponent} elevation={6} key={props.id} id={`card-${props.id}`} >
                <Grid container  >
                    <Grid item xs={8}>
                        <Stack spacing={1} sx={{height: '100%'}}>
                            {/* Displays the firstname, username, devType, & availablity of this user*/}
                            <Box sx={{flexWrap: 'nowrap', justifyContent: 'space-between' }}>
                                <div style={{display: 'flex', flexDirection: 'row', alignContent: 'center', justifyContent: 'center'}}>
                                    <Typography variant="subtitle1">
                                        {props.first_name} ~ {props.user_name} 
                                    </Typography>
                                    {/* <Typography variant="subtitle2" sx={{ml: 'auto', my: 'auto', opacity: '.6'}}>
                                        {props.dev_type}
                                    </Typography> */}
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
                            {/* Profile synop from this user */}
                            {/* <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                <Typography 
                                    paragraph 
                                    sx={{
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        display: '-webkit-box',
                                        lineClamp: 2,
                                        WebkitLineClamp: 2,
                                        WebkitBoxOrient: 'vertical',
                                    }}>
                                    {props.description}
                                </Typography>
                            </Box> */}
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
                    <Grid item xs={4} sx={{display: 'flex', alignContent: 'center', p: 0, m: 0}}>
                        <Box sx={{flexGrow: 0, justifyContent: 'center', px: 'auto', mb: 'auto', ml: 2}}>
                            <Box sx={{flexGrow: 1, ml: 'auto', float: 'right'}}>
                                <SpecialSwitch 
                                    label="select-user"
                                    key={`${props.id}`}
                                    id={`switch-${props.id}`}
                                    onClick={(event) => { event.stopPropagation(); handleCardChecked(props.id)}}
                                    onMouseDown={(event) => event.stopPropagation()}
                                    // onMouseOver={(event) => event.stopPropagation()}
                                    // onLoad
                                    />
                            </Box>

                            {/* Placeholder - get image from user inLR */}
                            <img 
                                src={Ava} 
                                style={{
                                    display: 'flex',
                                    maxHeight: '230px', 
                                    maxWidth:'230px',
                                    height: '100%',
                                    width: '100%',
                                    margin: 'auto',
                                    objectFit: 'scale-down',
                                    
                                }} 
                                alt="profile-pic" 
                                />

                        </Box>
                    </Grid>
                </Grid>
            </Paper>
        </CardActionArea>
    )
}

export default MyCard;