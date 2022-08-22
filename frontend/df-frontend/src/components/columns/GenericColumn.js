import React, { useMemo } from 'react'
import Grid from '@mui/material/Unstable_Grid2';
import { Typography, Box, Stack } from '@mui/material';
import AdvertSlot from '../cards/member-hall-cards/AdvertSlot';
import HighlightCard from '../cards/member-hall-cards/HighlightCard';
import { project_data as pData } from '../../data/data_data';
import { useSelector } from 'react-redux'

import { user_data } from '../../data/data_data'

let highlighted = []

const stickyLRContainerStyles = {
    position: 'sticky',
    top: 130,
}

const centerContainerStyles = {
    flexGrow: 1, 
    py: 1.25,
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


function GenericColumn(props) {

    const columnRegion = props.colRegion;
    const contStyles = props.colStyle;
    const columnHeading = props.colHeading;
    const columnSlots = props.colSlots;
    const topVal = props.colTop;
    
    // const columnSpecs = {
    //     colId: "messages-left-column"
    //     headingVals: { headingLeft: "LeFtHeAdEr", headingRight: null },
    //     rows: 2,
    //     topCoord: 130, (*or pass the values of appbars & other to this column)
    //     colSticky: false,
    //     givenWidths: [12, null, 6],
    //     components: [null, null, null]
    // }

    function setHeadings() {
        <>
            <Typography variant="h6">
                {props.headingVals.headingLeft}
            </Typography>
            {
                props.headingVals.headingRight 
                ? 
                    <Typography sx={subheadingText}>
                        {props.headingVals.headingRight}
                    </Typography>
                : null
            }
        </>
    }
    
    // extract each passed component value to display Grid Item by index
    function rollOutGrid() {
        for(let i in columnSlots) {
            i 
            ?
            
            :
            <Grid display={{xs: 'none', sm: 'flex'}} sm={12}>
                <AdvertSlot />
            </Grid>
        }
    }

    return (
        <Box id={props.colId} sx={props.colSticky ? stickyLRContainerStyles : centerContainerStyles}>
            <Stack spacing={2}>
                {
                    rollOutGrid()
                }
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