import React, { useMemo } from 'react'
import Grid from '@mui/material/Unstable_Grid2';
import { Typography, Box, Stack } from '@mui/material';
import AdvertSlot from '../cards/member-hall-cards/AdvertSlot';
import HighlightCard from '../cards/member-hall-cards/HighlightCard';
import { project_data as pData } from '../../data/data_data';
import { useSelector } from 'react-redux'
// import UserProfileQuick from '../cards/dashboard-cards/UserProfileQuick';
// import LatestNotifications from '../cards/dashboard-cards/LatestNotifications';
import { user_data } from '../../data/data_data'

let highlighted = []

const stickyLRContainerStyles = {
    position: 'sticky',
    top: 133,
}
const centerContainerStyles = {
    flexGrow: 1, 
}
const textBoxStyle = {
    width: '100%',
    display: 'flex', 
    flexDirection: 'row', 
    flexWrap: 'nowrap', 
    justifyContent: 'space-between'
}
const subheadingText = {
    float: 'right',
    opacity: .6, 
    fontSize: '1em', 
    mt: 'auto',
}


// Via props input - plots out passed components in a column format for more unified design approach
//  - headingLeft, headingRight?, item(s)? list [] -> (*passed-in component(s)) && if null item -> advert slot
function GenericColumn(props) {
    const setHeadings = () => {
        return(
            <Box 
                flexGrow={0} 
                sx={{ 
                    mt: 1, 
                    display: 'flex', 
                    flexDirection: 'row', 
                    flexWrap: 'nowrap', 
                    justifyContent: 'space-between',
                }}>
                {
                    props.headingVals.headingLeft
                    ? 
                    <Typography variant="h6" sx={{mb: 0}}>
                        {props.headingVals.headingLeft}
                    </Typography>
                    : null
                }
                {
                    props.headingVals.headingRight 
                    ? 
                    <Typography sx={subheadingText}> 
                        {props.headingVals.headingRight}
                    </Typography>
                    : null
                }
            </Box>
        )
    }
    
    // extract each passed component value to display Grid-Column (by index in passed obj)
    const rollOutGrid = () => {
        return (
            props.components.map((item, i) => 
                item !== null
                ? 
                <Grid xs={12} sx={{ px: 0 }}>
                    { props.components[i] }
                </Grid>
                :
                <Grid display={{ xs: 'none', sm: 'flex' }} sm={12}>
                    <AdvertSlot />
                </Grid>
            )
        )
    }

    // assembly of the card column (*as set now, need diverse layout & addtl types)
    return (
        <Box id={`column-${props.colId}`} sx={ props.colSticky ? stickyLRContainerStyles : centerContainerStyles }>
            { props.headingVals ? setHeadings() : null }
            <Stack spacing={1} sx={{mt: 1}}>
                { rollOutGrid() }
            </Stack>
        </Box>
    )
}

export default GenericColumn;


    // state content -- efforts for universality. WIP implement
    // const memberCardSelected = useSelector((state) => state.memberCardSelectedReducer.memberSelected);
    // let useMemberData; 

    // useMemo(() => {
    //     useMemberData = user_data[memberCardSelected - 1]
    // }, [memberCardSelected])

    
    // function highlightProject() {
    //     for(let i=0; i<pData.length; i++) {
    //         if (pData[i].highlight === true){
    //             highlighted.push(pData[i])
    //             break;
    //         }
    //     }
    //     return highlighted[0]
    // }