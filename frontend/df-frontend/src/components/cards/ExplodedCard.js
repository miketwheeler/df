import React from 'react'
import Grid from '@mui/material/Unstable_Grid2'
import { Typography, Stack, Box, Divider, Fade, Paper} from '@mui/material';
import { 
    FaceRetouchingOff, 
    FaceRetouchingNatural,
} from '@mui/icons-material'
import Ava from '../../static/images/avatar/2.png'
import { HeadingThenData } from '../text-components/HeadingThenData';
import { SkillLevel } from '../text-components/SkillLevel';
import { StarRatingComponent } from '../text-components/StarRatingComponent';


// styles applied to the entire card container
const cardComponent = {
    height: 'fit-content', 
    minHeight: '140px', 
    my: 2.6,
    color: 'primary.main',
    minWidth: '300px',
    border: 'none',
    display: 'block',
}


const ExplodedCard = (props) => {

    return (
        <Paper sx={cardComponent} elevation={18} key={props.id} id={`card-${props.id}`} >
            <Fade in={true} timeout={600}>
                <Grid container >
                    <Grid xs={12} sx={{mx: 1}}>
                        <Stack spacing={1} sx={{height: '100%'}} >
                            {/* Displays the firstname, username, devType, & availablity of this user*/}
                            <Box sx={{flexGrow: 1, flexWrap: 'nowrap', justifyContent: 'space-between' }}>
                                <div style={{display: 'flex', flexDirection: 'row', alignContent: 'center', justifyContent: 'center'}}>
                                    <Typography variant="subtitle1">
                                        {props.first_name} ~ {props.user_name} 
                                    </Typography>
                                    {
                                        props.availability === true 
                                        ?
                                        <>
                                            <Typography variant="subtitle2" sx={{ml: 'auto', my: 'auto', opacity: '.6'}}>
                                                available
                                            </Typography>
                                            <FaceRetouchingNatural sx={{height: 20, color: 'green', my: 'auto', ml: .1}} /> 
                                        </>
                                        : 
                                        <>
                                            <Typography variant="subtitle2" sx={{ml: 'auto', my: 'auto', opacity: '.6'}}>
                                                N/A
                                            </Typography>
                                            <FaceRetouchingOff sx={{height: 20, my: 'auto', opacity: .3, ml: .1}} />
                                        </>
                                    }
                                </div>
                            </Box>
                            <Divider orientation="horizontal" flexItem />
                            {/* Profile synop from this user */}
                            <Grid container sx={{m: 0, p: 0}}>
                                <Grid xs={5}>
                                    <Stack spacing={1}>
                                        <HeadingThenData headingVal={`specializes in: `} dataVal1={props.dev_type} />
                                        <HeadingThenData headingVal={`enrolled since: `} dataVal1={props.enroll_date} />
                                        <HeadingThenData headingVal={`teams on: `} dataVal1={props.teams} />
                                        <HeadingThenData headingVal={`region: `} dataVal1={props.state} />
                                    </Stack>
                                </Grid>
                                <Grid xs={7} sx={{display: 'flex', alignContent: 'center', p: 0, m: 0}}>
                                    <Box sx={{flexGrow: 0, justifyContent: 'center', p: 1}}>
                                        {/* Placeholder - get image from user inLR */}
                                        <img 
                                            src={Ava} 
                                            style={{
                                                // display: 'flex',
                                                maxHeight: '220px', 
                                                maxWidth:'220px',
                                                height: '100%',
                                                width: '100%',
                                                margin: 'auto',
                                                objectFit: 'scale-down',
                                            }} 
                                            alt="profile-pic" 
                                            />
                                    </Box>
                                </Grid>
                                <Grid xs={12}>
                                    <Box 
                                        sx={{
                                            flexGrow: 1, 
                                            display: 'flex',
                                            alignContent: 'flex-end',
                                            flexDirection: 'row', 
                                            flexWrap: 'noWrap', 
                                            justifyContent: 'space-between',
                                            my: 2,
                                        }}
                                        >
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
                            
                            {/* Gap placeholder  -- Put a Heart Icon for favoriting ? Put a connections # ? */}
                            {/* <Box sx={{flexGrow: 1, my: 2, fslexDirection: 'column', height: 'auto'}} /> */}

                        </Stack>
                    </Grid>                    
                </Grid>
            </Fade>
        </Paper>
    )
}

export default ExplodedCard