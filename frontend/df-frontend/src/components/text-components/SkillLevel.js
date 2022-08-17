import React from 'react'
import { Typography } from '@mui/material';
import { WorkspacePremium } from '@mui/icons-material'


// takes a skill level
export const SkillLevel = ({...props}) => {
    return (
        <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'nowrap'}}>
            <WorkspacePremium sx={{fontSize: 'inherit'}} />
            <Typography sx={{fontSize: '.8em'}}>
                x{props.skill_level}
            </Typography>
            <Typography sx={{fontSize: '.8em', flexWrap: 'nowrap', opacity: '.6'}}>
                &nbsp;skill level
            </Typography>
        </div>
    )
}
