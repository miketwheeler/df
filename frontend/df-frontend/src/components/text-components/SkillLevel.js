import React from 'react'
import { Typography } from '@mui/material';
import { WorkspacePremium } from '@mui/icons-material'


// takes a skill level
export const SkillLevel = ({...props}) => {
    return (
        <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'nowrap', position: 'flex-'}}>
            <WorkspacePremium sx={{fontSize: '1.2em'}} />
            <Typography sx={{fontSize: '.8em', mt: 'auto'}}>
                x{props.skill_level}
            </Typography>
            <Typography sx={{fontSize: '.8em', flexWrap: 'nowrap', opacity: '.6', mt: 'auto'}}>
                &nbsp;skills
            </Typography>
        </div>
    )
}
