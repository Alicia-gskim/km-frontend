import PropTypes from 'prop-types';
import { Box, Button, Card, Container, Dialog, DialogContent, DialogContentText, DialogTitle, IconButton, Modal, Stack, Table, TableBody, TableContainer, Typography } from "@mui/material";
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import TableList from '../../TableList';
import CloseIcon from '@mui/icons-material/Close';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

function BasicModal(props) {
    const  {onClose, contents, open} = props;

    console.log("modal contents : ", contents);
    
    const [scroll, setScroll] = useState('body');
    // const handleCloseModal = (target) => {
    //     console.log("modal is Bool? : ", target);
    //     isYn = target;
    //     contents = null;
    //     changeOpen(isYn);
    // }
    const handleClose = () => {
        onClose();
    }

    const descriptionElementRef = useRef(null);
    useEffect(() => {
        if( open ) {
            const { current: descriptionElement } = descriptionElementRef;
            if( descriptionElement !== null ) {
                descriptionElement.focus();
            }
        }
    }, [open]);

    return (
        <Dialog
                open={open}
                onClose={handleClose}
                scroll={scroll}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
                ref={descriptionElementRef}
                tabIndex={-1}
        >
            <DialogTitle id="scroll-dialog-title">
                <IconButton
                    aria-label="close"
                    onClick={() => handleClose(false)}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500]
                    }}
                >
                    <CloseIcon />
                </IconButton>
                RAW VIEW
            </DialogTitle>
            <DialogContent dividers={scroll === 'body'}>
                {contents
                ? <pre>{JSON.stringify(contents,null,2)}</pre>
                : <pre>new dialog</pre>}
            </DialogContent>
        </Dialog>
    )
};

BasicModal.propTypes = {
    onClose: PropTypes.func.isRequired,
    contents: PropTypes.object.isRequired,
    open: PropTypes.bool.isRequired
}

export default BasicModal;