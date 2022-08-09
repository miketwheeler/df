import React from 'react'
import Box from '@mui/material/Box'
import { Grid, Typography } from '@mui/material';
import SearchBar from '../SearchBar'
import MyCard from '../cards/MyCard';
import { user_data as data } from '../../data/data_data';
import LeftColumn from './member-hall-components/LeftColumn';



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
                        reach out, be genuine, be humble
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
            <Grid item sm={12} md={4} lg={4} xl={5}>
                <Typography variant='h6' sx={{px: 3}}>
                    section for clicked mini-profile expanded content & related messaging/notifications
                </Typography>
            </Grid>
        </Grid>
    </Box>
  )
}

export default MemberHall;