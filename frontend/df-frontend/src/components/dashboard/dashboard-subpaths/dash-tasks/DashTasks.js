import React from 'react';
import { Box } from '@mui/material';
import GenericColumn from '../../../columns/GenericColumn';
import GenericInfoCard from '../../../cards/GenericInfoCard';
import GenericProfileCard from '../../../cards/GenericProfileCard';
import Grid from '@mui/material/Unstable_Grid2';
import { user_data, project_data } from '../../../../data/data_data';

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

const test_project = project_data[0];
const test_user1 = user_data[0];
const test_user2 = user_data[1];

const dashLeftCol = {
    colId: 'dashboard-tasks-left-column',
    headingVals: { headingLeft: "Project Type Card" },
    colSticky: true,
    components: [<GenericInfoCard user={test_project} />, <GenericInfoCard />],
}
const dashMiddleCol = {
    colId: 'dashboard-tasks-middle-column',
    headingVals: { headingLeft: "Person Type Card", headingRight: 'select' },
    colSticky: true,
    components: [<GenericProfileCard {...test_user1} />, <GenericProfileCard {...test_user2} />],
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
            <Grid container xs={12} md={8.99}>
                <Grid xs={12} md={8}>
                    <GenericColumn { ...dashMiddleCol } />
                </Grid>
                <Grid xs={12} md={4} sx={{ display: { } }}>
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