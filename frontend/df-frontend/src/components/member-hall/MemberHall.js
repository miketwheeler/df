import React from 'react'
import Box from '@mui/material/Box'
import { Grid, Typography } from '@mui/material';
import SearchBar from '../SearchBar'
import MyCard from '../cards/MyCard';
import { user_data as data } from '../../data/data_data';
import LeftColumn from './member-hall-components/LeftColumn';
import CenterColumn from './member-hall-components/CenterColumn'
import RightColumn from './member-hall-components/RightColumn';

// import ExplodedCard from '../cards/ExplodedCard';

const barTitle="member hall"

const containerStyles = {
    w: '100%',
    bgcolor: 'background.paper',
    color: 'primary.main'
}

const gridContainerStyles = {
    height: '100%',
    display: 'flex',
    pl: 3
}


const MemberHall = () => {
    return (
        <Box sx={containerStyles}>
            <SearchBar title={barTitle} />
            <Grid container spacing={3} sx={gridContainerStyles}>
                <Grid item xs={12} md={3}>
                    <LeftColumn />
                </Grid>
                <Grid item xs={12} md={5} lg={4}>
                    <CenterColumn />
                </Grid>
                <Grid item xs={12} md={4} lg={5}>
                    <Box sx={{flexGrow: 1, position: 'sticky', top: 60}}>
                        <RightColumn />
                    </Box>
                </Grid>
            </Grid>
        </Box>
    )
}

export default MemberHall;