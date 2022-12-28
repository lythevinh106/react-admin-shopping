import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useSnackbar } from '@mui/base';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function AlertModal({ onCloseAlert, content = "", type = "success" }) {
    const [open, setOpen] = React.useState(true);
    const { enqueueSnackbar } = useSnackbar();
    // const handleClick = () => {
    //     setOpen(true);
    // };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        onCloseAlert()
    };

    return (
        <Stack spacing={2} sx={{ width: '100%' }}>
            {/* <Button variant="outlined" onClick={handleClick}>
                Open success snackbar
            </Button> */}
            <Snackbar open={open} autoHideDuration={1000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={type} sx={{ width: '100%' }}>
                    {/* {content} */}
                    {enqueueSnackbar("ggggg")}
                </Alert>
            </Snackbar>
            {/* <Alert severity="error">This is an error message!</Alert>
            <Alert severity="warning">This is a warning message!</Alert>
            <Alert severity="info">This is an information message!</Alert>
            <Alert severity="success">This is a success message!</Alert> */}
        </Stack>
    );
}