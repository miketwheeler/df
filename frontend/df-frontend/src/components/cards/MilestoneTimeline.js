import * as React from 'react';
import { Paper, Typography, Divider, makeStyles, Box, Tooltip } from '@mui/material';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import { project_data } from '../../data/data_data'


const containerStyles = {
    p: 2,
    color: 'primary.main',
    border: 'none',
    justifyContent: 'left'
}
const headingVal = "milestone progress"
const project = project_data[0];
const maxMilestones = 5;
// const newTodaysDate = new Date().toISOString();
// const todaysDate = new Date().toLocaleDateString();
// console.log(`todays date: ${new Date(todaysDate).toISOString()}`)


// TODO: replace mock data with this user's project data (req, res)!!!!!!!
const dummyTimelineData = [
    { msNum: 1, dateVal: project.start_date, complete: true },
    { msNum: 2, dateVal: '02/22/2022', complete: true },
    { msNum: 3, dateVal: '04/20/2022', complete: false },
    { msNum: 4, dateVal: '07/10/2022', complete: false },
    { msNum: 5, dateVal: project.end_date, complete: false }
]

// console.log(`date from data: ${new Date(dummyTimelineData[1].dateVal).toISOString()},   date created: ${newTodaysDate}`)
// console.log(`date eval result: ${new Date(dummyTimelineData[1].dateVal).toISOString() > newTodaysDate}`)


const CreateTimelineItem = (props) => {
    // let isLate = new Date(props.dateVal).toISOString().localeCompare(newTodaysDate) < 0;

    const handleSimplDate = (val) => {
        return val.replace(val.slice(3,8), "")
    }

    return (
        <TimelineItem 
            sx={{ 
                opacity: props.complete === true ? 1 : .3,
                // color: isLate ? 'primary.main' : 'red'
            }}
            >
                {/* <> */}
                <TimelineOppositeContent>
                    {`m${props.msNum}`}
                </TimelineOppositeContent>
                <TimelineSeparator>
                    <TimelineDot variant={props.complete === true ? 'filled' : 'outlined'} />
                    {
                        props.msNum !== maxMilestones
                        ? <TimelineConnector />
                        : null
                    }
                </TimelineSeparator>
            <Tooltip title={props.dateVal} placement="top">
                <TimelineContent 
                    sx={{
                        textOverflow: 'elipses', 
                        whiteSpace: 'nowrap', 
                        overflow: 'hidden'
                        }}
                        >
                    { handleSimplDate(props.dateVal) }
                </TimelineContent>
            </Tooltip>
                {/* </> */}
        </TimelineItem>
    )
}

export default function LeftPositionedTimeline(props) {
    return (
        <Paper sx={ containerStyles } elevation={ 6 } id={ `milestone-timeline-tracker` }>
            <Typography variant="subtitle1" sx={{ mb: 1, color:'primary.main' }}>
                { headingVal }
            </Typography>
            <Divider orientation="horizontal" flexItem  sx={{ mb: 1 }} />
            <Box 
                // overflow="hidden" 
                // display="flex" 
                id="timeline-container" 
                >
                <Timeline position="right" sx={{}}>
                    { 
                        dummyTimelineData.map((item, i) => {
                            return <CreateTimelineItem {...item} />
                        })
                    }
                </Timeline>
            </Box>
        </Paper>
    );
}
