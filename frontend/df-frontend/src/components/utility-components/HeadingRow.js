import React from 'react'
import { Typography, Box } from '@mui/material';
import { FaceRetouchingOff, FaceRetouchingNatural } from '@mui/icons-material'


const rowContainer = {flexGrow: 1, flexWrap: 'nowrap', justifyContent: 'space-between', width: '100%', pr: 0 }
const rowInnerBox = {display: 'flex', flexDirection: 'row', alignContent: 'center', justifyContent: 'center'}
const subtitle2Styles = { ml: 'auto', my: 'auto', opacity: '.6' }
const availabilityIconStyles = { height: 20, color: 'green', my: 'auto', ml: .1}
const unavailabilityIconStyles = { height: 20, my: 'auto', opacity: .3, ml: .1 }


// accepts props - type*(headingRightVal, availablity)
const HeadingRow = (props) => {
    return (
        <Box sx={rowContainer}>
            <div style={rowInnerBox}>
                <Typography variant="subtitle1">
                    {props.headingLeftVal}
                </Typography>
                {
                    props.headingRightVal
                    ?
                    <Typography variant="subtitle2" sx={{ml: 'auto', my: 'auto', opacity: '.6'}}>
                        {props.headingRightVal}
                    </Typography>
                    :
                    null
                }
                {
                    props.availability && props.availability !== null
                    ?
                    <>
                        <Typography variant="subtitle2" sx={subtitle2Styles}>
                            {
                            props.availability === true ? 'available' : 'N/A'
                            }
                        </Typography>
                        {
                            props.availability === true 
                            ?
                            <FaceRetouchingNatural sx={availabilityIconStyles} />
                            :
                            <FaceRetouchingOff sx={unavailabilityIconStyles} />
                        }
                    </>
                    :
                    null
                }
                {/* This is a slot for an Icon - like the mini card, and adjacent to it's info */}
                <Typography sx={{my: 'auto', mx: 0, opacity: '.6'}}>
                    {props.project_type}
                </Typography>
            </div>
        </Box>
    )
}

export default HeadingRow;