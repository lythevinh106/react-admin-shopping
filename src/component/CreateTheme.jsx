import { createTheme } from "@mui/material";


export const customTheme = createTheme({
    palette: {
        neutral: {
            main: '#ff5',
            contrastText: '#fff',
        },
        vars: {

            "--green-default": "#00917a",
            "--green-second": "##00483d",


        },

    },
});