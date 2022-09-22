import React from 'react'
import { Box } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';

import UserProfileQuick from '../../../cards/dashboard-cards/UserProfileQuick';
import LatestNotifications from '../../../cards/dashboard-cards/LatestNotifications'; //takes an id value -> sets id 'card-${x}' && key ${x}
import CentralContent from '../../../cards/dashboard-cards/CentralContent'
import GenericColumn from '../../../columns/GenericColumn';


const containerStyles = {
    flexGrow: 1, 
    width: '100%',
    bgcolor: 'background.paper',
    color: 'primary.main',
    // height: '100%',
    // height: 'fit-content',
    // top: 64,
}

const gridContainerStyles = {
    display: 'flex',
    maxWidth: '1840px',
    px: 3,
    mx: 'auto',
    mt: 0
}

const dashLeftColumnObj = {
    colId: 'dashboard-home-left-column',
    headingVals: { headingLeft: "my profile", headingRight: null },
    colSticky: true,
    components: [<UserProfileQuick />, <LatestNotifications />, <LatestNotifications />],
    colCardRowHeights: [8, 2, 2]
}
const dashCenterColumnObj = {
    colId: 'dashboard-home-center-column',
    headingVals: { headingLeft: "project updates", headingRight: null },
    colSticky: false,
    components: [<CentralContent />, <LatestNotifications />],
    colCardRowHeights: [10, 2]

}
const dashRightColumnObj = {
    colId: 'dashboard-home-right-column',
    headingVals: { headingLeft: "far right", headingRight: null },
    colSticky: false,
    components: [<CentralContent />, <LatestNotifications />],
    colCardRowHeights: [10, 2]
}
const dashSecondaryUpper = {
    colId: 'project-tracker',
    headingVals: { headingLeft: null, headingRight: null },
    colSticky: false,
    components: [<LatestNotifications />] // exchange for milestone tracker
}


const DashHome = (props) => {    
    return (
        <Box component="div" sx={containerStyles} id='dash-home-container'>

            {/* section 1 */}
            {/* Need container height - then pass colCardRows to the generic column for x/12*/}
            <Grid container spacing={2} sx={ gridContainerStyles }>
                <Grid xs={12} sm={3}>
                    <GenericColumn { ...dashLeftColumnObj } />
                </Grid>
                <Grid container xs={12} sm={8} >
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

            {/* section 2 */}
            {/* <Grid container spacing={2} sx={ gridContainerStyles }>
                <Grid xs={12}>
                    <GenericColumn { ...dashSecondaryUpper } />
                </Grid>
            </Grid> */}
        </Box>
    )
}

export default DashHome;