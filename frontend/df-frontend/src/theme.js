// import * as React from 'react'
import { createTheme } from '@mui/material/styles';

// import '@fontsource/play/300.css'

export const theme = createTheme({
    palette: {
        type: 'dark',
        primary: {
            main: '#f1f1f1',
        },
        background: {
            default: '#1e1e1e',
            paper: '#2f2f2f',
        },
        divider: '#37474f',
        secondary: {
            main: '#1976d2',
        },
        cards: {
            background: '#2f2f2f',
            border: '1px solid transparent',
            borderRadius: '5px',
        },

    },
    typography: {
        fontFamily: 'Play',
        h1: {
            fontFamily: 'Play',
        },
        h2: {
            fontFamily: 'Play',
        },
        h3: {
            fontFamily: 'Play',
        },
        h4: {
            fontFamily: 'Play',
        },
        h6: {
            fontFamily: 'Play',
        },
        h5: {
            fontFamily: 'Play',
        },
        subtitle1: {
            fontFamily: 'Play',
        },
        subtitle2: {
            fontFamily: 'Play',
        },
        button: {
            fontFamily: 'Play',
            fontWeight: 500,
        },
        overline: {
            fontFamily: 'Orbitron',
        },
        
    },
})

// export const themeOptions = {
//     palette: {
//         type: 'dark',
//         primary: {
//             main: '#f1f1f1',
//         },
//         background: {
//             default: '#1e1e1e',
//             paper: '#2f2f2f',
//         },
//         divider: '#37474f',
//         secondary: {
//             main: '#1976d2',
//         },
//     },
//     typography: {
//         fontFamily: 'Open Sans',
//         h1: {
//             fontFamily: 'Play',
//         },
//         h2: {
//             fontFamily: 'Play',
//         },
//         h3: {
//             fontFamily: 'Play',
//         },
//         h4: {
//             fontFamily: 'Play',
//         },
//         h6: {
//             fontFamily: 'Play',
//         },
//         h5: {
//             fontFamily: 'Play',
//         },
//         subtitle1: {
//             fontFamily: 'Play',
//         },
//         subtitle2: {
//             fontFamily: 'Play',
//         },
//         button: {
//             fontFamily: 'Droid Sans',
//             fontWeight: 700,
//         },
//         overline: {
//             fontFamily: 'Orbitron',
//         },
//     },
// };