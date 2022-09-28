import * as React from 'react';
import { Paper, Box, Typography, Divider } from '@mui/material';
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

const headingVals = {
    headingLeftVal: "Milestone Progress"
}

const project = project_data[0];
const maxMilestones = 5;

////////////////////////////////////////////////
// create list to map out using these functions


const buildTimeline = () => {
    for(let i=0; i<maxMilestones; i++) {
        const passVals = {
            msNum: i+1,
            dateVal: i===0 ? project.start_date : i===maxMilestones-1 ? project.end_date : '04/20/2022'
        }
    CreateTimelineItem(passVals)
    }
}

const CreateTimelineItem = (props) => {
    return (
        <TimelineItem>
            <TimelineOppositeContent>
                {`m${props.msNum}`}
            </TimelineOppositeContent>
            <TimelineSeparator>
                <TimelineDot />
                {
                    props.msNum !== maxMilestones
                    ? <TimelineConnector />
                    : null
                }
            </TimelineSeparator>
            <TimelineContent>
                {props.dateVal}
            </TimelineContent>
        </TimelineItem>
    )
}

export default function LeftPositionedTimeline() {
    return (
        <Paper sx={containerStyles} elevation={6} id={`milestone-timeline-tracker`}>
            <Typography variant="subtitle1" sx={{mb: 1}}>
                milestone progress
            </Typography>
            <Divider orientation="horizontal" flexItem  sx={{mb: 1}} />
            
            <Timeline position="right">

                { buildTimeline() }

            </Timeline>
        </Paper>
    );
}



// {/* <TimelineItem>
//     <TimelineOppositeContent>
//         m1
//     </TimelineOppositeContent>
//     <TimelineSeparator>
//         <TimelineDot />
//         <TimelineConnector />
//     </TimelineSeparator>
//     <TimelineContent>
//         {project.start_date}
//     </TimelineContent>
// </TimelineItem>

// <TimelineItem>
//     <TimelineOppositeContent>
//         m2
//     </TimelineOppositeContent>
//     <TimelineSeparator>
//         <TimelineDot />
//         <TimelineConnector />
//     </TimelineSeparator>
//     <TimelineContent>
//         01/18/2022
//     </TimelineContent>
// </TimelineItem>

// <TimelineItem sx={{opacity: .3}}>
//     <TimelineOppositeContent >
//         m3
//     </TimelineOppositeContent>
//     <TimelineSeparator >
//         <TimelineDot variant='outlined' />
//         <TimelineConnector  />
//     </TimelineSeparator>
//     <TimelineContent>
//         04/20/2022
//     </TimelineContent>
// </TimelineItem>

// <TimelineItem sx={{opacity: .3}}>
//     <TimelineOppositeContent>
//         m4
//     </TimelineOppositeContent>
//     <TimelineSeparator>
//         <TimelineDot variant='outlined' />
//         <TimelineConnector />
//     </TimelineSeparator>
//     <TimelineContent>
//         07/23/2022
//     </TimelineContent>
// </TimelineItem>

// <TimelineItem sx={{opacity: .3}}>
//     <TimelineOppositeContent>
//         m5
//     </TimelineOppositeContent>
//     <TimelineSeparator>
//         <TimelineDot variant='outlined' />
//     </TimelineSeparator>
//     <TimelineContent>
//         {project.end_date}
//     </TimelineContent>
// </TimelineItem> */}