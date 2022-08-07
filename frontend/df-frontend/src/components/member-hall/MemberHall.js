import React from 'react'
import Box from '@mui/material/Box'
import { Grid } from '@mui/material';
import SearchBar from '../SearchBar'
import MyCard from '../cards/MyCard';
import { user_data as data } from '../../data/data_data';



const barTitle="Member Hall"


const MemberHall = () => {

  return (
    <Box sx={{ width: '100%', bgcolor: 'background.paper', color: 'primary.main' }}>
      
        <SearchBar title={barTitle} />
      
        <Grid container spacing={2} sx={{display: 'flex',height: '100%', p: 2}}>
            <Grid item sm={12} md={8} lg={6} xl={4}>
                {
                    data.map((user, i) => (
                        user ? <MyCard {...user} /> : null
                    ))
                }
                <MyCard />
            </Grid>
            <Grid item sm={12} md={4} lg={6} xl={8}>
                Grid Item Righty all the Right stuff
            </Grid>
        </Grid>
    </Box>
  )
}

export default MemberHall;