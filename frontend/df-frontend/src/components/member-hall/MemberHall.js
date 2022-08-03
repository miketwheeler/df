import React from 'react'
import Box from '@mui/material/Box'
import { AppBar, Grid } from '@mui/material';
import SearchBar from '../SearchBar'

const barTitle="Member Hall"

const MemberHall = () => {
  return (
    <Box sx={{ width: '100%', bgcolor: 'background.paper', color: 'primary.main' }}>
      {/* <AppBar position="static" sx={{ display: 'flex', alignItems: 'center' }}>
        <h4>
          Member Hall
        </h4>
        
      </AppBar> */}
      <SearchBar title={barTitle} />
      <Grid container spacing={2} sx={{display: 'flex',height: '100%', p: 2}}>
        <Grid item xs={8}>
          Grid Item Lefty
        </Grid>
        <Grid item xs={4}>
          Grid Item Righty
        </Grid>
      </Grid>
    </Box>
  )
}

export default MemberHall;