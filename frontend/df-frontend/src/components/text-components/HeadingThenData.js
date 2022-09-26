import React from 'react'
import { Typography } from '@mui/material';


// accepts props - type*(datespan, ratio, or none), headingVal, dataVal1, dataVal2
export const HeadingThenData = ({type, headingVal, dataVal1, dataVal2}) => {
    return (
        <Typography sx={{width: '100%', display: 'flex', flexWrap: 'wrap'}}>
            <Typography variant='specHeader' sx={{opacity: .6}}>
                {
                    headingVal !== null
                    ?
                    <>{headingVal}&nbsp;</>
                    :
                    null
                }
                
            </Typography>
            {
                type !== null
                ?
                    type === 'datespan'
                    ? `${dataVal1}-${dataVal2}`
                    : type === 'ratio'
                    ? `${dataVal1} of ${dataVal2}`
                    : dataVal1
                :
                null
            }
        </Typography>
    )
}
