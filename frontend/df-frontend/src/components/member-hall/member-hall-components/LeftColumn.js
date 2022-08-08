import React from 'react'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid';
import { Typography, Stack, Box, Divider} from '@mui/material';
import AdvertSlot from '../../cards/AdvertSlot';
import { project_data as pData } from '../../../data/data_data';
import HighlightCard from '../../cards/HighlightCard';



function highlightProject() {
    for (let project in pData) {
        if(project.highlight && project.highlight === true) {
            return project
        }
    }
}
console.log(`pData: ${highlightProject()}`)

function LeftColumn(props) {
    return (
        <>
            <Grid container sx={{height: 'fit-content'}} spacing={2}>
                <Grid item xs={12}>
                    <Typography variant="h6" sx={{px: 3}}> My Project </Typography>
                    <HighlightCard {...highlightProject} />
                </Grid>
                <Grid item xs={12}>
                    {/* <Typography variant="h6" sx={{height: 'fit-content'}}> Highlight </Typography> */}
                    <AdvertSlot />
                </Grid>
                <Grid item xs={12}>
                    Other content
                </Grid>
            </Grid>
        </>
    )
}

export default LeftColumn;