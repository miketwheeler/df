import React from 'react'
import Box from '@mui/material/Box'
import { Grid, Typography } from '@mui/material';
import SearchBar from '../SearchBar'
import MyCard from '../cards/MyCard';
import { user_data as data } from '../../data/data_data';
import LeftColumn from './member-hall-components/LeftColumn';



const barTitle="Member Hall"


const MemberHall = () => {

  return (
    <Box sx={{ width: '100%', bgcolor: 'background.paper', color: 'primary.main' }}>
      
        <SearchBar title={barTitle} />
      
        <Grid container spacing={3} sx={{display: 'flex',height: '100%', p: 2}}>
            <Grid item display={{xs: 'none', md: 'none', lg: 'flex'}} lg={2}>
                <LeftColumn />
            </Grid>
            <Grid item sm={12} md={8} lg={6} xl={5}>
                <Typography variant='h5' sx={{px: 3}}>
                    Say hello, your new team awaits
                </Typography>
                {
                    data.map((user, i) => (
                        user ? <MyCard {...user} /> : null
                    ))
                }
                <MyCard />
            </Grid>
            <Grid item sm={12} md={4} lg={4} xl={5}>
                <Typography variant='h6' sx={{px: 3}}>
                    Grid Item Righty all the Right stuff
                </Typography>
            </Grid>
        </Grid>
    </Box>
  )
}

export default MemberHall;