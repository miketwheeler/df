import React from 'react'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid';
import { Typography, Stack, Box, Divider, Rating } from '@mui/material';
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


const component = { 
    height: '500px', 
    // display: 'flex',
    // flexDirection: 'column',
    background: '#7d7d7d7d',
    width: '90%',
    color: 'black',
    padding: 2,
    margin: 'auto',
    // margin: '10px 10px 10px 10px',
    '&:hover': {
        boxShadow: '.5px .5px 3px 1px #1976d2'
    }
}



function AdvertSlot(props) {
    return (
        <div style={component}>
            <h5 style={{margin: 2}}>Advertisement</h5>
        </div>
    )

}

export default AdvertSlot