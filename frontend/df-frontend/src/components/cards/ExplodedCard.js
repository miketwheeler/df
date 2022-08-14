import React from 'react'
import { Typography, Stack, Box, Divider, Rating, Fade, Paper, Grid} from '@mui/material';
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
import useWebAnimations from '@wellyshen/use-web-animations'


// styles applied to the entire card container
const cardComponent = {
    height: 'fit-content', 
    minHeight: '140px', 
    p: 2,
    my: 2,
    color: 'primary.main',
    minWidth: '300px',
    border: 'none',
    display: 'block',
    // position: 'sticky',
}


const ExplodedCard = (props) => {

    const { ref } = useWebAnimations({
        playbackRate: 1,
        autoplay: true,
        keyframes: { 
            boxShadow: [
                '.5px .5px 3px 1px rgba(25,118,210, 0)', 
                '.5px .5px 3px 1px rgba(25,118,210, 4)', 
                '.5px .5px 3px 1px rgba(25,118,210, .7)', 
                '.5px .5px 3px 1px rgba(25,118,210, .4)', 
                '.5px .5px 3px 1px rgba(25,118,210, .2)', 
                '.5px .5px 3px 1px rgba(25,118,210, .1)',
            ] 
        },
        animationOptions: { duration: 1000, fill: 'auto' },
    })

    console.log(`props.id: ${props.id}`)

    return (
        <Paper sx={cardComponent} elevation={18} className="target" key={props.id} id={`exploded-card-${props.id}`} ref={ref}>
            <Fade in={true}>
                <Grid container>
                    <Grid item xs={12}>
                        <Stack spacing={1} sx={{height: '100%'}} >
                            {/* Displays the firstname, username, devType, & availablity of this user*/}
                            <Box sx={{flexGrow: 1, flexWrap: 'nowrap', justifyContent: 'space-between' }}>
                                <div style={{display: 'flex', flexDirection: 'row', alignContent: 'center', justifyContent: 'center'}}>
                                    <Typography variant="subtitle1">
                                        {props.first_name} ~ {props.user_name} 
                                    </Typography>
                                    <Typography variant="subtitle2" sx={{ml: 'auto', my: 'auto', opacity: '.6'}}>
                                        available
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
                            <Grid container>
                                <Grid item xs={8}>
                                    <Stack spacing={1}>
                                        <Typography variant="subtitle2" sx={{opacity: '.6'}}>
                                            specializes in: &nbsp; {props.dev_type}
                                        </Typography>
                                        <Typography variant="subtitle2" sx={{opacity: '.6'}}>
                                            enrolled since: &nbsp; {props.enroll_date}
                                        </Typography>
                                        <Typography variant="subtitle2" sx={{opacity: '.6'}}>
                                            teams on: &nbsp; {props.teams}
                                        </Typography>
                                        <Typography variant="subtitle2" sx={{opacity: '.6'}}>
                                            region: &nbsp; {props.state}
                                        </Typography>
                                        
                                    </Stack>
                                </Grid>

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
                                <Grid item xs={12}>

                                    <Box sx={{
                                        flexGrow: 1, 
                                        display: 'flex',
                                        alignContent: 'flex-end',
                                        flexDirection: 'row', 
                                        flexWrap: 'noWrap', 
                                        justifyContent: 'space-between',
                                        my: 2,
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

                                    <Divider sx={{my: 2}} orientation="horizontal" flexItem />

                                </Grid>

                                <Grid item xs={12}>
                                    <Stack spacing={1}>
                                        <Typography paragraph>
                                            <Typography sx={{opacity: .6}}>
                                                about: 
                                            </Typography>
                                            {props.description}
                                        </Typography>
                                        <Typography paragraph>
                                            <Typography sx={{opacity: .6}}>
                                                skills: 
                                            </Typography>
                                            {
                                                props.skills_list.map((i) => i !== props.skills_list[props.skills_list.length-1] ? `${i} | ` : `${i}`)
                                            }
                                        </Typography>
                                    </Stack>
                                </Grid>

                            </Grid>
                            
                            {/* Gap placeholder */}
                            <Box sx={{flexGrow: 1, my: 2, flexDirection: 'column', height: 'auto'}} />
                            {/* Rating and Current Skill Level of this user */}
                            
                        </Stack>
                    </Grid>
                    {/* Right column - displays profile img and selection to cluster message */}
                    
                </Grid>
            </Fade>
        </Paper>
    )
}

export default ExplodedCard