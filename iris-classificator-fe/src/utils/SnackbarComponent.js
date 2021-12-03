import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function SnackbarComponent(props){
        const handleClose = (event, reason) => {
            if (reason === 'clickaway') {
                return;
            }
            props.setOpen(false);
        };

        return (
                <Snackbar open={props.open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center"
                }}>
                    <Alert onClose={handleClose} severity={props.severity} sx={{ width: '100%' }}>
                        {props.message}
                    </Alert>
                </Snackbar>
        );
}