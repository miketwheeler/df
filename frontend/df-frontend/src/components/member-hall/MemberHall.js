import React from 'react'
import Box from '@mui/material/Box'
import { Grid, Typography } from '@mui/material';
import SearchBar from '../SearchBar'
import MyCard from '../cards/MyCard';
import { user_data as data } from '../../data/data_data';
import LeftColumn from './member-hall-components/LeftColumn';
import RightColumn from './member-hall-components/RightColumn';

// import ExplodedCard from '../cards/ExplodedCard';

const barTitle="member hall"

const MemberHall = () => {

    return (
    <Box sx={{ width: '100%', bgcolor: 'background.paper', color: 'primary.main' }}>

        <SearchBar title={barTitle} />
        <Grid container spacing={3} sx={{display: 'flex',height: '100%', p: 2}}>
            {/* <Grid item display={{xs: 'none', md: 'none', lg: 'flex'}} lg={2}> */}
            <Grid item xs={12} md={2}>
                <LeftColumn />
            </Grid>
            <Grid item sm={12} md={8} lg={6} xl={5}>
                <Box sx={{display: 'flex', flexDirection: 'row', flexWrap: 'nowrap', justifyContent: 'space-between'}}>
                    <Typography variant='h5' sx={{px: 3}}>
                        outreach
                    </Typography>
                    <Typography sx={{px: 3, opacity: .6, fontSize: '1em', mt: 'auto'}}>
                        select
                    </Typography>
                </Box>
                {
                    data.map((user, i) => (
                        user ? <MyCard {...user} /> : null
                    ))
                }
                <MyCard />
            </Grid>
            <Grid item sm={12} md={2} lg={4} xl={5} spacing={2}>
                <RightColumn />
            </Grid>
        </Grid>
    </Box>
  )
}

export default MemberHall;