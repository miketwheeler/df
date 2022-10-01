import * as React from 'react';
import { Paper, Typography, Divider, Stack } from '@mui/material';
import { HeadingThenData } from '../utility-components/HeadingThenData';


const containerStyles = {
    p: 2,
    color: 'primary.main',
    border: 'none',
    justifyContent: 'left'
}
const headingVal = "funding status"


function FundingCard(props) {
    return (
        <Paper sx={ containerStyles } elevation={ 6 } id={ `milestone-timeline-tracker` }>
            <Typography variant="subtitle1" sx={{ mb: 1, color:'primary.main' }}>
                { headingVal }
            </Typography>
            <Divider orientation="horizontal" flexItem  sx={{ mb: 1 }} />
            <Stack spacing={1}>
                <HeadingThenData headingVal={'funded: '} dataVal1={props.funded.toString()} />
                <HeadingThenData headingVal={'project cost: '} dataVal1={props.fund_estimate} />
            </Stack>
        </Paper>
    );
}

export default FundingCard;