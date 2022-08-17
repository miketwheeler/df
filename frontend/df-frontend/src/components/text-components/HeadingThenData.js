import React from 'react'
import { Typography } from '@mui/material';


// accepts props - type*(datespan, ratio, or none), headingVal, dataVal1, dataVal2
export const HeadingThenData = ({...props}) => {
    return (
        <Typography sx={{width: '100%', wrap: 'nowrap'}}>
            <Typography variant='subtitle2' sx={{display: 'flex', flexDirection: 'row', wrap: 'nowrap', opacity: .6}}>
                {props.headingVal}
            </Typography>
            {
                props.type === 'datespan'
                ? `${props.dataVal1}-${props.dataVal2}`
                : props.type === 'ratio'
                ? `${props.dataVal1} of ${props.dataval2}`
                : props.dataVal1
            }
        </Typography>
    )
}
