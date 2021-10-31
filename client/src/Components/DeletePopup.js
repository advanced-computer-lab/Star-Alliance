import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { ProgressBar } from 'react-bootstrap';

export default function DeletePopup(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const confirmation = () => {
    const response = window.confirm("Are you sure you want to delete");
    console.log(response);
  };

  const handleClose = () => {
    confirmation();
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <div className={props.color}>
      <Button variant="outline-danger" style={{width:"14.3rem", height:"1.75rem", padding:"0.1rem"}} onClick={handleClickOpen}>
        {props.name}
      </Button>
      
      <Dialog open={open} onClose={handleClose}>
      <div style={{width:"30rem"}}>
        <DialogTitle>{props.title}</DialogTitle>
        <DialogContent>
          <DialogContentText >
           {props.description} 
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label={props.label}
            type="email"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel}>Cancel</Button>
          {/* <DeletePopup 
            name="Delete" 
            title="Delete Flight" 
            description="Are you sure you want to delete"
            btnText="Confirm"   
            label=""
            color="btn btn-outline-danger"
          /> */}
          <Button onClick={handleClose}>{props.btnText}</Button> 
        </DialogActions>
        </div>
      </Dialog>
    </div>
  );
}
