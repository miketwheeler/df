import React from 'react'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid';
import { Typography, Stack, Box, Divider, Icon, Rating } from '@mui/material';
import { 
    Star,
    NotInterested, 
    PersonAdd,
    PersonAddDisabled,
    FaceRetouchingOff, 
    FaceRetouchingNatural,
    Favorite,
    FavoriteBorder,
    WorkspacePremium,
    WorkspacePremiumOutlined
} from '@mui/icons-material'
import { theme } from '../../theme'
import Ava from '../../static/images/avatar/2.png'


const cardComponent = {
    height: 'fit-content', 
    minHeight: '140px', 
    p: 2, m: 2, 
    color: 'primary.main',
    '&:hover': {
        boxShadow: '.5px .5px 3px 1px #1976d2'
    }
}


function MyCard(props) {

    return (
        <Paper sx={cardComponent} elevation={6} key={props.id}>
            <Grid container>
                <Grid item xs={8}>
                    <Stack spacing={1}>
                        <Box sx={{flexGrow: 1, flexWrap: 'nowrap', justifyContent: 'space-between' }}>
                            <div style={{display: 'flex', flexDirection: 'row', alignContent: 'center', justifyContent: 'center'}}>
                                <Typography variant="subtitle1">
                                    {props.first_name} ({props.user_name}) 
                                </Typography>
                                <Typography variant="subtitle2" sx={{ml: 'auto', my: 'auto'}}>
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
                                    // pb: 'auto'
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
                            // pt: "auto",
                            }}
                            >
                            <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'nowrap', height: '20px'}}>
                                <Typography sx={{fontSize: '.7em'}}>rated &nbsp;</Typography>
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
                            <Typography sx={{fontSize: '.7em', flexWrap: 'nowrap'}}>
                                    {/* &nbsp;skill  */}
                                    skill &nbsp;
                                </Typography>
                                <WorkspacePremium sx={{fontSize: 'inherit'}} />
                                <Typography sx={{fontSize: '.8em'}}>
                                    x{props.skill_level}
                                </Typography>
                                
                            </div>
                        </Box>
                        {/* </Box>  */}
                    </Stack>
                </Grid>
                <Grid item xs={4} sx={{display: 'flex', alignContent: 'center'}}>
                    <Box sx={{flexGrow: 1, justifyContent: 'center', px: 'auto'}}>
                        <img 
                            src={Ava} 
                            style={{
                                maxHeight: '230px', 
                                maxWidth:'230px',
                                minHeight: '120px',
                                minWidth: '120px',
                                // alignSelf: 'middle',
                                // justifySelf: 'center',
                                height: '100%',
                                width: '100%',
                                // margin: 'auto',
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

export default MyCard;