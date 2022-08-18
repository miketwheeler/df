import React, { useMemo } from 'react'
import Grid from '@mui/material/Unstable_Grid2';
import { Typography, Box, Skeleton } from '@mui/material';
import AdvertSlot from '../../cards/AdvertSlot';
import ExplodedCard from '../../cards/ExplodedCard';
import MessageBox from '../../cards/MessageBox';
import { useSelector } from 'react-redux'

// import axios from 'axios'
import { user_data } from '../../../data/data_data'


const containerStyles = {
    position: 'sticky',
    top: 130,
}

function RightColumn() {

    // gets the state for the current member-card selected passes to an exploded view
    const memberCardSelected = useSelector((state) => state.memberCardSelectedReducer.memberSelected);
    let useMemberData; 

    useMemo(() => {
        useMemberData = user_data[memberCardSelected - 1]
    }, [memberCardSelected])


    return (
        <Box sx={containerStyles}>
            <Grid container spacing={2}>
                <Grid xs={12}>
                    <Typography variant="h6" sx={{mt: .3}}>
                        {
                            memberCardSelected !== -1
                            ? 'member detail'
                            : 'select to expand...'
                        }
                    </Typography>
                    {
                        memberCardSelected !== -1
                        ?
                        <ExplodedCard {...useMemberData} startAnim={true} />
                        // <ExplodedCard />
                        :
                        <Box sx={{flexGrow: 1, py: 3, alignContent: 'center'}}>
                            <Skeleton variant="rectangular" animation="wave" height={420} width={'100%'} sx={{borderRadius: 2}} />
                        </Box>
                    }    
                </Grid>
                <Grid xs={12}>
                    <MessageBox />
                </Grid>
                <Grid xs={12}>
                    <AdvertSlot />
                </Grid>
            </Grid>
        </Box>
    )
}

export default RightColumn