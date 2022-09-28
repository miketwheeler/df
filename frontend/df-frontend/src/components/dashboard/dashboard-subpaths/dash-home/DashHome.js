import React from 'react'
import { Box } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';

import UserProfileQuick from '../../../cards/dummy-card-placeholder/UserProfileQuick';
import LatestNotifications from '../../../cards/dummy-card-placeholder/LatestNotifications'; //takes an id value -> sets id 'card-${x}' && key ${x}
import CentralContent from '../../../cards/dummy-card-placeholder/CentralContent'
import GenericColumn from '../../../columns/GenericColumn';


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

const dashLeftColumnObj = {
    colId: 'dashboard-home-left-column',
    headingVals: { headingLeft: "my profile", headingRight: null },
    colSticky: true,
    components: [<UserProfileQuick />, <LatestNotifications />, <LatestNotifications />],
}
const dashCenterColumnObj = {
    colId: 'dashboard-home-center-column',
    headingVals: { headingLeft: "project updates", headingRight: null },
    colSticky: false,
    components: [<CentralContent />, <LatestNotifications />],
}
const dashRightColumnObj = {
    colId: 'dashboard-home-right-column',
    headingVals: { headingLeft: "far right", headingRight: null },
    colSticky: false,
    components: [<CentralContent />, <LatestNotifications />],
}
const dashSecondaryUpper = {
    colId: 'project-tracker',
    headingVals: { headingLeft: null, headingRight: null },
    colSticky: false,
    components: [<LatestNotifications />] // exchange for milestone tracker
}

// Assembles the DASHBOARD/HOME page
// -main layout and waypoint for passing in the components to model on this page
const DashHome = (props) => {    
    return (
        <Box sx={containerStyles} id='dash-home-container'>
            {/* section 1 */}
            {/* Need container height - then pass colCardRows to the generic column for x/12*/}
            <Grid container spacing={2} sx={ gridContainerStyles }>
                <Grid container xs={12} md={3}>
                    <Grid xs={12}>
                        <GenericColumn { ...dashLeftColumnObj } />
                    </Grid>
                </Grid>
                <Grid container xs={12} md={8.9}>
                    <Grid xs={12} md={8}>
                        <GenericColumn { ...dashCenterColumnObj } />
                    </Grid>
                    <Grid xs={12} md={4}>
                        <GenericColumn { ...dashRightColumnObj } />
                    </Grid>
                    <Grid xs={12}>
                        <GenericColumn { ...dashSecondaryUpper } />
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    )
}

export default DashHome;