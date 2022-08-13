import React from 'react'
// import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid';
import { Typography, Stack, Box, Divider } from '@mui/material';
import AdvertSlot from '../../cards/AdvertSlot';
import { project_data as pData } from '../../../data/data_data';
import HighlightCard from '../../cards/HighlightCard';


let highlighted = []

const containerStyles = {
    flexGrow: 1, 
    p: 2,
}


function LeftColumn(props) {
    
    function highlightProject() {
        for(let i=0; i<pData.length; i++) {
            if (pData[i].highlight === true){
                highlighted.push(pData[i])
                break;
            }
            console.log(`found highlighted: ${highlighted}`)
        }
        return highlighted[0]
    }


    return (
        <Box sx={containerStyles}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant="h6">
                        my project
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <HighlightCard {...highlightProject()} />
                </Grid>
                <Grid item xs={12}>
                    <AdvertSlot />
                </Grid>
                <Grid item xs={12}>
                    
                </Grid>
            </Grid>
        </Box>
    )
}

export default LeftColumn;