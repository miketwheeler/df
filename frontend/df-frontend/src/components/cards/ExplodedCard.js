import React, { useMemo, useRef } from 'react'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid';
import { 
    Typography, Stack, Box, Divider, Rating, Checkbox, 
    CardActionArea, FormGroup, FormControlLabel, Switch, 
    styled, alpha, IconButton, Portal, Modal, Dialog
} from '@mui/material';
import { green } from '@mui/material/colors'
import { 
    Star,
    FaceRetouchingOff, 
    FaceRetouchingNatural,
    Favorite,
    FavoriteBorder,
    WorkspacePremium,
    LineAxisOutlined,
} from '@mui/icons-material'
import { theme } from '../../theme'
import Ava from '../../static/images/avatar/2.png'



// styles applied to the entire card container
const cardComponent = {
    height: 'fit-content', 
    minHeight: '140px', 
    p: 2,
    mx: 3,
    color: 'primary.main',
    minWidth: '300px',
    border: 'none',
    '&:hover': { boxShadow: '.5px .5px 3px 1px #1976d2' },
    '&:active': { boxShadow: '.5px .5px 3px 1px #1976d2' },
}


function ExplodedCard(props) {

    return (
        <Paper sx={cardComponent} elevation={6} key={props.id} id={`card-${props.id}`} >
            <Grid container  >
                <Grid item xs={8}>
                    <Stack spacing={1} sx={{height: '100%'}}>
                        {/* Displays the firstname, username, devType, & availablity of this user*/}
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
                        {/* Profile synop from this user */}
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
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
                {/* Right column - displays profile img and selection to cluster message */}
                <Grid item xs={4} sx={{display: 'flex', alignContent: 'center', p: 0, m: 0}}>
                    <Box sx={{flexGrow: 0, justifyContent: 'center', px: 'auto', mb: 'auto', ml: 2}}>
        
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
    )
}

export default ExplodedCard