import React from 'react'
// import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid';
import { Typography, Stack, Box, Divider } from '@mui/material';
import AdvertSlot from '../../cards/AdvertSlot';
import { project_data as pData } from '../../../data/data_data';
import HighlightCard from '../../cards/HighlightCard';


let highlighted = []


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
        <Box sx={{flexGrow: 0}}>
            <Grid container sx={{height: 'fit-content'}} spacing={2}>
                <Grid item xs={12}>
                    <Typography variant="h6" sx={{px: 3}}>
                        my project
                    </Typography>
                    <HighlightCard {...highlightProject()} />
                </Grid>
                <Grid item xs={12}>
                    {/* <Typography variant="h6" sx={{height: 'fit-content'}}> Highlight </Typography> */}
                    <AdvertSlot />
                </Grid>
                <Grid item xs={12}>
                    
                </Grid>
            </Grid>
        </Box>
    )
}

export default LeftColumn;