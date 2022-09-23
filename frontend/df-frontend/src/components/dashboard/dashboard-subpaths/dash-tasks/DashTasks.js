import React from 'react';
import { Box } from '@mui/material';
import GenericColumn from '../../../columns/GenericColumn';
import GenericCard from '../../../cards/GenericCard';
import Grid from '@mui/material/Unstable_Grid2';

const containerStyles = {
    flexGrow: 1, 
    width: '100%',
    bgcolor: 'background.paper',
    color: 'primary.main',
}

const gridContainerStyles = {
    display: 'flex',
    maxWidth: '1840px',
    px: 3,
    mx: 'auto',
    mt: 0,
    width: '100%',
}

const projectCardDeets = {

}

const personCardDeets = {
    
}


const dashLeftCol = {
    colId: 'dashboard-tasks-left-column',
    headingVals: { headingLeft: "Project Type Card" },
    colSticky: true,
    components: [<GenericCard {...projectCardDeets} />, <GenericCard />],
}
const dashMiddleCol = {
    colId: 'dashboard-tasks-middle-column',
    headingVals: { headingLeft: "Person Type Card", headingRight: 'select' },
    colSticky: true,
    components: [<GenericCard {...projectCardDeets} />, <GenericCard {...projectCardDeets} />],
}

// Assembles the DASHBOARD/TASKS page
// -main layout and waypoint for passing in the components to model on this page
const DashTasks = (props) => {
    return (
        <Box sx={containerStyles} id='dash-home-container'>
        {/* section 1 */}
        {/* Need container height - then pass colCardRows to the generic column for x/12*/}
        <Grid container spacing={2} sx={ gridContainerStyles }>
            <Grid container xs={12} md={3}>
                <Grid xs={12}>
                    <GenericColumn { ...dashLeftCol } />
                </Grid>
            </Grid>
            <Grid container xs={12} md={8.9}>
                <Grid xs={12} md={8}>
                    <GenericColumn { ...dashMiddleCol } />
                </Grid>
                <Grid xs={12} md={4}>
                    {/* <GenericColumn { ...dashRightColumnObj } /> */}
                </Grid>
                <Grid xs={12}>
                    {/* <GenericColumn { ...dashSecondaryUpper } /> */}
                </Grid>
            </Grid>
        </Grid>
    </Box>
    )
}

export default DashTasks;