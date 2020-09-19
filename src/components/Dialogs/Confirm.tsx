import * as React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Typography } from '@material-ui/core';

interface Props {
    open: boolean
    handleSubmit: (email: string, password: string) => void;
    handleClose: () => void;
}

const Confirm: React.FC<Props> = ({ open, handleClose, handleSubmit }) => {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    return (
        <>
            <Dialog open={true} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Delete user?</DialogTitle>
                <DialogContent>
                    <Typography></Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => handleSubmit(email, password)} variant="contained" color="secondary">
                        Delete
                    </Button>

                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    
                  
                </DialogActions>
            </Dialog>
        </>
    );
}

export default Confirm; 