import React from 'react'
import { Typography } from '@mui/material';


// accepts props - type*(datespan, ratio, or none), headingVal, dataVal1, dataVal2
export const HeadingThenData = ({...props}) => {
    return (
        <Typography sx={{width: '100%', display: 'flex', flexWrap: 'wrap'}}>
            <Typography variant='specHeader' sx={{opacity: .6}}>
                {
                    props.headingVal !== null
                    ?
                    <>{props.headingVal}&nbsp;</>
                    :
                    null
                }
                
            </Typography>
            {
                props.type !== null
                ?
                    props.type === 'datespan'
                    ? `${props.dataVal1}-${props.dataVal2}`
                    : props.type === 'ratio'
                    ? `${props.dataVal1} of ${props.dataVal2}`
                    : props.dataVal1
                :
                null
            }
        </Typography>
    )
}
