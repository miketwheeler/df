import React, { useMemo } from 'react'
import Grid from '@mui/material/Grid';
import { Typography, Stack, Box, Divider, Skeleton } from '@mui/material';
import AdvertSlot from '../../cards/AdvertSlot';
import { project_data as pData } from '../../../data/data_data';
import ExplodedCard from '../../cards/ExplodedCard'
import { useSelector } from 'react-redux'

// import axios from 'axios'
import { user_data } from '../../../data/data_data'



function RightColumn() {

    // gets the state for the current member-card selected passes to an exploded view
    const memberCardSelected = useSelector((state) => state.memberCardSelectedReducer.memberSelected);
    let useMemberData; 

    useMemo(() => {
        useMemberData = user_data[memberCardSelected -1]
    }, [memberCardSelected])


    return (
        <Box sx={{flexGrow: 1}}>
            <Grid container sx={{height: 'fit-content'}} spacing={2}>
                <Grid item xs={12} sx={{p: 4}}>
                    <Typography variant="h6" sx={{px: 3}}>
                        view member in greater detail
                    </Typography>
                    {
                        memberCardSelected !== -1
                        ?
                        <ExplodedCard {...useMemberData} />
                        :
                        <Skeleton variant="rectangular" animation="wave" height={420} width={'100%'} sx={{p: 4}} />
                    }    
                </Grid>
                <Grid item xs={12}>
                    <AdvertSlot />
                </Grid>
                <Grid item xs={12}>
                    
                </Grid>
            </Grid>
        </Box>
    )
}

export default RightColumn