import React from 'react'
import { Typography, Box } from '@mui/material';
import { FaceRetouchingOff, FaceRetouchingNatural } from '@mui/icons-material'

const subtitle2Styles = { ml: 'auto', my: 'auto', opacity: '.6' }
const availabilityIconStyles = { height: 20, color: 'green', my: 'auto', ml: .1 }
const unavailabilityIconStyles = { height: 20, my: 'auto', opacity: .3, ml: .1 }



const AvailabilityHeader = (props) => {
    return (
        props.availability === true 
        ?
        <>
            <Typography variant="subtitle2" sx={subtitle2Styles}>
                available
            </Typography>
            <FaceRetouchingNatural sx={availabilityIconStyles} /> 
        </>
        : 
        <>
            <Typography variant="subtitle2" sx={subtitle2Styles}>
                N/A
            </Typography>
            <FaceRetouchingOff sx={unavailabilityIconStyles} />
        </>
    )
}

// accepts props - type*(datespan, ratio, or none), headingVal, dataVal1, dataVal2
const HeadingRow = ({...props}) => {
    return (
        <Box sx={{flexGrow: 1, flexWrap: 'nowrap', justifyContent: 'space-between' }}>
            <div style={{display: 'flex', flexDirection: 'row', alignContent: 'center', justifyContent: 'center'}}>
                <Typography variant="subtitle1">
                    {props.headingVal}
                </Typography>
                {
                    props.headingRightVal
                    ?
                    <Typography variant="subtitle2" sx={{ml: 'auto', my: 'auto', opacity: '.6'}}>
                        {props.rightHeadingVal}
                    </Typography>
                    :
                    props.availabilityHeading
                    ?
                    <AvailabilityHeader props={props.availability} />
                    :
                    null
                }

                {/* This is a slot for an Icon - like the mini card, and adjacent to it's info */}
                <Typography sx={{my: 'auto', mx: 1, opacity: '.6'}}>
                    {props.project_type}
                </Typography>
            </div>
        </Box>
    )
}

export default HeadingRow;