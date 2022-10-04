import React from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Unstable_Grid2';
import SearchBar from '../SearchBar'
import { user_data, project_data } from '../../data/data_data';
import GenericInfoCard from '../cards/GenericInfoCard';
import GenericProfileCard from '../cards/GenericProfileCard';
import GenericColumn from '../columns/GenericColumn';
import StaticExpandedProfileCard from '../cards/StaticExpandedProfileCard';
import MessageBox from '../cards/MessageBox';

const barTitle="member hall"

const containerStyles = {
    flexGrow: 1,
    width: "100%",
    bgcolor: 'background.paper',
    color: 'primary.main',
}

const gridContainerStyles = {
    display: 'flex',
    maxWidth: '1840px',
    px: 3,
    mx: 'auto',
    mt: 0,
    width: '100%'
}

const test_project = project_data[0];
const qty_users = 16;
const getUsersList = (qty) => {
    const display_users_list = [];
    for(let i=0; i<=qty; i++) {
        display_users_list.push(
            <GenericProfileCard {...user_data[i]} />
        );
    }
    return display_users_list;
}

const leftCol = {
    colId: 'member-hall-left-column',
    headingVals: { headingLeft: "my project" },
    colSticky: true,
    components: [<GenericInfoCard {...test_project} />, null],
}
const middleCol = {
    colId: 'member-hall-middle-column',
    headingVals: { headingLeft: "members", headingRight: 'select' },
    colSticky: false,
    components: getUsersList(qty_users)
}
const rightCol = {
    colId: 'member-hall-right-column',
    headingVals: { headingDynamic: ['member detail', 'select to expand...'] },
    colSticky: true,
    components: [ <StaticExpandedProfileCard />, null ],
}

const MemberHall = (props) => {
    return (
        <Box component="div" sx={containerStyles}>
            <SearchBar title={barTitle} />
            <Grid container spacing={2} sx={gridContainerStyles}>
                <Grid xs={12} md={3}>
                    {/* <LeftColumn /> */}
                    <GenericColumn { ...leftCol } />
                </Grid>
                <Grid xs={12} md={5} lg={4}>
                    {/* <CenterColumn /> */}
                    <GenericColumn { ...middleCol } />
                </Grid>
                <Grid display={{ xs: 'none', md: 'block' }} md={4} lg={5}>
                    {/* <RightColumn /> */}
                    <GenericColumn { ...rightCol } />
                </Grid>
            </Grid>
            <MessageBox />
        </Box>
    )
}

export default MemberHall;