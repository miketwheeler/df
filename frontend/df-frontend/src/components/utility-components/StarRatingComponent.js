import React from 'react'
import { Typography, Rating } from '@mui/material';
import { Star } from '@mui/icons-material'


// takes a rating for building an imutable rating display
export const StarRatingComponent = ({...props}) => {
    return (
        <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'nowrap'}}>
            <Typography sx={{fontSize: '.8em', opacity: '.6', mt: 'auto'}}>
                rated &nbsp;
            </Typography>
            <Rating
                name="retrieved-imutable-rating"
                size="small"
                value={props.rating}
                readOnly
                sx={{color: 'primary.main', '& .MuiRating-iconEmpty': {color: 'inherit', opacity: .12}}}
                emptyIcon={<Star fontSize='inherit' fontColor="#525252" />}
                />
        </div>
    )
}
