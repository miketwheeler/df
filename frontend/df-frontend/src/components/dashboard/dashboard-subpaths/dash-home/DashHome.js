import React from 'react'
import { Typography, Box } from '@mui/material'
import { theme } from '../../../../theme';
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
        rows: 2,
        topCoord: 130, // replace with passed prop - distance from top *if needed
        colSticky: true,
        components: [<UserProfileQuick />, <LatestNotifications />]
    }
    
    return (
        <Box component="main" sx={containerStyles}>
            <Grid container spacing={2} sx={gridContainerStyles}>
                <Grid xs={12} md={3}>
                    <GenericColumn
                        {...leftColumnObj}
                        />
                    {/* <UserProfileQuick />
                    <LatestNotifications /> */}
                </Grid>
                <Grid xs={12} md={6}>
                    <CentralContent />
                </Grid>
                <Grid xs={12} md={3}>
                    {/* <UserProfileQuick /> */}
                </Grid>
            
            
            </Grid>
        </Box>
    )
}

export default DashHome;