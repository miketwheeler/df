import React from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Unstable_Grid2';
import SearchBar from '../SearchBar'
// import MyCard from '../cards/MyCard';
// import { user_data as data } from '../../data/data_data';
import LeftColumn from './member-hall-components/LeftColumn';
import CenterColumn from './member-hall-components/CenterColumn'
import RightColumn from './member-hall-components/RightColumn';

// import ExplodedCard from '../cards/ExplodedCard';

const barTitle="member hall"

const containerStyles = {
    flexGrow: 1,
    width: "100%",
    bgcolor: 'background.paper',
    color: 'primary.main',
}

const gridContainerStyles = {
    height: '100%',
    display: 'flex',
    maxWidth: '1840px',
    px: 3,
    mx: 'auto',
}


const MemberHall = () => {
    return (
        <Box sx={containerStyles}>
            <SearchBar title={barTitle} />
            <Grid container spacing={2} sx={gridContainerStyles}>
                <Grid xs={12} md={3}>
                    <LeftColumn />
                </Grid>
                <Grid xs={12} md={5} lg={4}>
                    <CenterColumn />
                </Grid>
                <Grid xs={12} md={4} lg={5}>
                    <RightColumn />
                </Grid>
            </Grid>
        </Box>
    )
}

export default MemberHall;