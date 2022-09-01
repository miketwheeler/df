import React from 'react'
import { Box } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';

import UserProfileQuick from '../../../cards/dashboard-cards/UserProfileQuick';
import LatestNotifications from '../../../cards/dashboard-cards/LatestNotifications';
import CentralContent from '../../../cards/dashboard-cards/CentralContent'
import GenericColumn from '../../../columns/GenericColumn';


const containerStyles = {
    flexGrow: 0, 
    width: '100%',
    bgcolor: 'background.paper',
    color: 'primary.main',
    // height: '100%',
    // height: 'fit-content',
    // top: 64,

}

const gridContainerStyles = {
    // height: '100%',
    display: 'flex',
    maxWidth: '1840px',
    px: 3,
    mx: 'auto',
    mt: 0
}


const DashHome = () => {
    const dashLeftColumnObj = {
        colId: 'dashboard-home-left-column',
        headingVals: { headingLeft: "my profile", headingRight: null},
        colSticky: true,
        components: [<UserProfileQuick />, <LatestNotifications />, <LatestNotifications />]
    }
    const dashCenterColumnObj = {
        colId: 'dashboard-home-center-column',
        headingVals: { headingLeft: "project updates", headingRight: null},
        colSticky: false,
        components: [<CentralContent />, <LatestNotifications />, <LatestNotifications />]
    }
    const dashRightColumnObj = {
        colId: 'dashboard-home-right-column',
        headingVals: { headingLeft: "far right", headingRight: null},
        colSticky: false,
        components: [<CentralContent />, <LatestNotifications />]
    }
    // const dashSecondaryUpper = {
    //     colId: 'project-tracker',
    //     headingVals: { headingLeft: null, headingRight: null},
    //     colSticky: false,
    //     components: [<LatestNotifications />]
    // }
    
    return (
        <Box component="div" sx={containerStyles} id='dash-home-container'>
            <Grid container spacing={2} sx={gridContainerStyles}>
                <Grid xs={12} md={3}>
                    <GenericColumn {...dashLeftColumnObj} />
                </Grid>
                <Grid xs={12} md={6}>
                    <GenericColumn {...dashCenterColumnObj} />
                </Grid>
                <Grid xs={12} md={3}>
                    <GenericColumn {...dashRightColumnObj} />
                    {/* <GenericColumn {...dashSecondaryUpper} /> */}
                </Grid>
            </Grid>
            {/* <Grid container spacing={2} sx={gridContainerStyles}>
            //     <Grid xs={12}>
                    
            //     </Grid>
            // </Grid> */}
        </Box>
    )
}

export default DashHome;