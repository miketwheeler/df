import React from 'react'
import { Typography, Box } from '@mui/material';
import { FaceRetouchingOff, FaceRetouchingNatural } from '@mui/icons-material'


const rowContainer = {flexGrow: 1, flexWrap: 'nowrap', justifyContent: 'space-between', width: '100%', pr: 0 }
const rowInnerBox = {display: 'flex', flexDirection: 'row', alignContent: 'center', justifyContent: 'center'}


// accepts props::
//    - headingLeftVal(str), headingRightVal(str), availablity(bool), project_type(str))
const HeadingRow = (props) => {

    return (
        <Box sx={rowContainer}>
            <div style={rowInnerBox}>
                <Typography 
                    variant="subtitle1"
                    sx={{ 
                        width: 200,
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                    }}
                    >
                    {props.headingLeftVal}
                </Typography>
                {
                    props.headingRightVal !== null
                    ?
                    <Typography variant="subtitle2" sx={{ml: 'auto', my: 'auto', opacity: '.6'}}>
                        {props.headingRightVal}
                    </Typography>
                    :
                    null
                }
                {
                    props.availability !== null
                    ?
                    <>
                        <Typography variant="subtitle2" sx={{ ml: 'auto', my: 'auto', opacity: '.6' }}>
                            {
                            props.availability ? 'available' : 'N/A'
                            }
                        </Typography>
                        {
                            props.availability
                            ?
                            <FaceRetouchingNatural sx={{ height: 20, color: 'green', my: 'auto', ml: .1}} />
                            :
                            <FaceRetouchingOff sx={{ height: 20, my: 'auto', opacity: .3, ml: .1 }} />
                        }
                    </>
                    :
                    null
                }
                {
                    props.project_type
                    ?
                    <Typography sx={{my: 'auto', mx: 0, opacity: '.6'}}>
                        {props.project_type}
                    </Typography>
                    :
                    null
                }
            </div>
        </Box>
    )
}

export default HeadingRow;