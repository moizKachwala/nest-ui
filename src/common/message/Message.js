import React from 'react';
import PropTypes from 'prop-types';
import {Collapse, Alert, IconButton} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export default function Message({ children, theme = 'info' }) {
    const [open, setOpen] = React.useState(true);
    return (
        <Collapse in={open}>
            <Alert
                severity={theme}
                action={
                    <IconButton
                        aria-label="close"
                        color="inherit"
                        size="small"
                        onClick={() => {
                            setOpen(false);
                        }}
                    >
                        <CloseIcon fontSize="inherit" />
                    </IconButton>
                }
            >
                {children}
            </Alert>
        </Collapse>
    );
}

Message.prototype = {
    theme: PropTypes.oneOf(['primary', 'success', 'error', 'warning']),
    children: PropTypes.any,
}