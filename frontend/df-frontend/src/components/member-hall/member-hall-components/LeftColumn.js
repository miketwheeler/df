import React from 'react'
// import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Unstable_Grid2';
import { Typography, Box } from '@mui/material';
import AdvertSlot from '../../cards/AdvertSlot';
import { project_data as pData } from '../../../data/data_data';
import HighlightCard from '../../cards/HighlightCard';


let highlighted = []

const containerStyles = {
    // flexGrow: 1, 
    position: 'sticky',
    top: 130,
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
            <Grid container rowSpacing={2} columnSpacing={{xs: 1}}>
                <Grid xs={12}>
                    <Typography variant="h6">
                        my project
                    </Typography>
                </Grid>
                <Grid xs={12}>
                    <HighlightCard {...highlightProject()} />
                </Grid>
                <Grid display={{xs: 'none', sm: 'flex'}} sm={12}>
                    <AdvertSlot />
                </Grid>
                <Grid xs={12}>
                    
                </Grid>
            </Grid>
        </Box>
    )
}

export default LeftColumn;