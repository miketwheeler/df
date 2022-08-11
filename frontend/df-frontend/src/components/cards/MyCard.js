import React, { useState } from 'react'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid';
import { Typography, Stack, Box, Divider, Rating, Checkbox, Button, CardActionArea } from '@mui/material';
import { 
    Star,
    FaceRetouchingOff, 
    FaceRetouchingNatural,
    Favorite,
    FavoriteBorder,
    WorkspacePremium,
} from '@mui/icons-material'
import { theme } from '../../theme'
import Ava from '../../static/images/avatar/2.png'
import { useSelector, useDispatch } from 'react-redux'
import { memberAdd, memberRemove } from '../../slices/memberhallSlices/memberIdListSlice';
import { memberSelect } from '../../slices/memberhallSlices/memberCardSelectSlice';


const cardComponent = {
    height: 'fit-content', 
    minHeight: '140px', 
    p: 2,
    color: 'primary.main',
    minWidth: '400px',
    border: 'none',
    '&:hover': {
        boxShadow: '.5px .5px 3px 1px #1976d2'
    },
    '&:active': {
        boxShadow: '.5px .5px 3px 1px #1976d2'
    },

}

function MyCard(props) {
    const membersCheckBoxSelected = useSelector((state) => state.memberIdListReducer.memberIdList);
    const memberCardSelected = useSelector((state) => state.memberCardSelectedReducer.memberSelected);
    const dispatch = useDispatch();

    function handleCardChecked(cardId) {
        membersCheckBoxSelected.includes(cardId) ? dispatch(memberRemove(cardId)) : dispatch(memberAdd(cardId))
    }

    const handleProfileSelected = (cardId) => {
        if(memberCardSelected === cardId) dispatch(memberSelect(cardId))
    }

    return (
        <CardActionArea sx={{ m: 2}} onClick={() => handleProfileSelected(props.id)}>
        <Paper sx={cardComponent} elevation={6} key={props.id} id={`card-${props.id}`} >
            <Grid container >
                <Grid item xs={8}>
                    <Stack spacing={1}>
                        <Box sx={{flexGrow: 1, flexWrap: 'nowrap', justifyContent: 'space-between' }}>
                            <div style={{display: 'flex', flexDirection: 'row', alignContent: 'center', justifyContent: 'center'}}>
                                <Typography variant="subtitle1">
                                    {props.first_name} ~ {props.user_name} 
                                </Typography>
                                <Typography variant="subtitle2" sx={{ml: 'auto', my: 'auto', opacity: '.6'}}>
                                    {props.dev_type}
                                </Typography>
                                {
                                    props.availability === true 
                                    ? <FaceRetouchingNatural sx={{height: 20, color: 'green', my: 'auto', mx: 1,}} /> 
                                    : <FaceRetouchingOff sx={{height: 20, my: 'auto', mx: 1, opacity: .3}} />
                                }
                            </div>
                        </Box>
                        <Divider orientation="horizontal" flexItem />
                        <Box sx={{display: 'flex', flexDirection: 'column'}}>
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
                        </Box>
                        <Box sx={{flexGrow: 1}} />
                        <Box sx={{
                            flexGrow: 1, 
                            display: 'flex',
                            flexDirection: 'row', 
                            flexWrap: 'noWrap', 
                            justifyContent: 'space-between',
                            }}
                            >
                            <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'nowrap', height: '20px'}}>
                                <Typography sx={{fontSize: '.8em', opacity: '.6'}}>rated &nbsp;</Typography>
                                <Rating
                                    name="retrieved-imutable-rating"
                                    size="small"
                                    value={props.rating}
                                    readOnly
                                    sx={{color: 'primary.main', '& .MuiRating-iconEmpty': {color: 'inherit', opacity: .12}}}
                                    emptyIcon={<Star fontSize='inherit' fontColor="#525252" />}
                                    />
                            </div>
                            <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'nowrap', height: '20px'}}>
                                <WorkspacePremium sx={{fontSize: 'inherit'}} />
                                <Typography sx={{fontSize: '.8em'}}>
                                    x{props.skill_level}
                                </Typography>
                                <Typography sx={{fontSize: '.8em', flexWrap: 'nowrap', opacity: '.6'}}>
                                    &nbsp;skill level
                                </Typography>
                            </div>
                        </Box>
                    </Stack>
                </Grid>
                <Grid item xs={4} sx={{display: 'flex', alignContent: 'center', p: 0, m: 0}}>
                    <Box sx={{flexGrow: 1, justifyContent: 'center', px: 'auto'}}>

                        <Checkbox 
                            label="select"
                            key={`${props.id}`}
                            id={`cards-checkbox-${props.id}`}
                            onClick={() => handleCardChecked(props.id)}
                            sx={{
                                zIndex: 300,
                                color: 'primary.main', 
                                m: 0, 
                                p:0, 
                                float: 'right', 
                                '&.Mui-checked': {color: 'secondary.main'} 
                            }} 
                            />

                        <img 
                            src={Ava} 
                            style={{
                                display: 'block',
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