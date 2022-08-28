import React from 'react'
import { Box } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';

import UserProfileQuick from '../../../cards/dashboard-cards/UserProfileQuick';
import LatestNotifications from '../../../cards/dashboard-cards/LatestNotifications';
import CentralContent from '../../../cards/dashboard-cards/CentralContent'
import GenericColumn from '../../../columns/GenericColumn';


const containerStyles = {
    flexGrow: 1, 
    width: '100%',
    bgcolor: 'background.paper',
    color: 'primary.main',
    height: '100%',
    top: 64
}

const gridContainerStyles = {
    height: '100%',
    display: 'flex',
    maxWidth: '1840px',
    px: 3,
    mx: 'auto',
    mt: 0
}



const DashHome = () => {
    const leftColumnObj = {
        colId: 'dashboard-home-left-column',
        headingVals: { headingLeft: "my profile", headingRight: null},
        colSticky: true,
        components: [<UserProfileQuick />, <LatestNotifications />]
    }
    const centerColumnObj = {
        colId: 'dashboard-home-center-column',
        headingVals: { headingLeft: "project updates", headingRight: null},
        colSticky: false,
        components: [<CentralContent />]
    }
    const rightColumnObj = {
        colId: 'dashboard-home-right-column',
        headingVals: { headingLeft: "far right", headingRight: null},
        colSticky: false,
        components: [<CentralContent />]
    }
    const secondaryUpper = {
        colId: 'project-tracker',
        headingVals: { headingLeft: null, headingRight: null},
        colSticky: false,
        components: [<LatestNotifications />]
    }
    
    return (
        <Box component="main" sx={containerStyles}>
            <Grid container spacing={2} sx={gridContainerStyles}>
                <Grid xs={12} md={3}>
                    <GenericColumn {...leftColumnObj} />
                </Grid>
                <Grid xs={12} md={6}>
                    <GenericColumn {...centerColumnObj} />
                </Grid>
                <Grid xs={12} md={3}>
                    <GenericColumn {...rightColumnObj} />
                </Grid>
                <Grid xs={12}>
                    <GenericColumn {...secondaryUpper} />
                </Grid>
            </Grid>
        </Box>
    )
}

export default DashHome;