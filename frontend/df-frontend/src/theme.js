// import * as React from 'react'
import { sx } from '@mui/joy/styles/styleFunctionSx';
import { createTheme } from '@mui/material/styles';
// import { blue } from '@mui/material/colors'
import { ThemeOptions } from '@mui/material';
// import '@fontsource/play/300.css'

const primaryDarkColor = '#f1f1f1';
const lightBlueShade = '#1976d2';



export const themeOptions = {
    palette: {
        type: 'dark',
        primary: {
            main: '#e6e6e6',
            contrastText: '#3f3f3f',
        },
        background: {
            default: '#252525',
            paper: '#2d2d2d',
        },
        divider: 'rgba(3,169,244,0.17)',
        secondary: {
            main: '#1565c0',
            light: '#4fc3f7',
            dark: '#51565c',
            contrastText: '#f9fbfd',
        },
        text: {
            disabled: 'rgba(72,71,71,0.5)',
            hint: '#4fc3f7',
            secondary: '#03a9f4',
            primary: 'rgba(249,249,249,0.87)',
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
            fontWeight: 700,
        },
        overline: {
            fontFamily: 'Play',
        },
    },
};


export const theme = createTheme({
    ...themeOptions,
    components: {
        MuiButton: {
            styleOverrides: {
                root: sx({
                    textTransform: 'none',
                    fontWeight: 540,
                })
            }
        },
        MuiInput: {
            styleOverrides: {
                root: sx({
                    borderColor: '#1565c0',
                })
            }
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    borderColor: '2px solid rgb(161,161,161)'
                },
                input: {
                    '&:-webkit-autofill': {
                        'WebkitBoxShadow': '0 0 0 30px #266798 inset',
                        'WebkitTextFillColor': '#f1f1f1',
                    },
                },
                select: {
                    'background-color': '#1565c0',
                }
            }
        }
    }
})