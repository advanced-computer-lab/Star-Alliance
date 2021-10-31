import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const PopupView = (props) => {
  const handleClose = () => {
    props.setshowDialog(false);
  };

  return (
    <>
      <Dialog open={props.showDialog} onClose={handleClose} fullWidth>
        <DialogTitle>{props.title}</DialogTitle>
        <DialogContent>
          {props.subtext && (
            <DialogContentText>{props.subtext}</DialogContentText>
          )}
          {/* <TextField
            autoFocus
            margin="dense"
            fullWidth
            variant="standard"
            required
            name="test"
            label="test"
            type="test"
            id="test"
          /> */}
          {/* <Typography variant="h6" gutterBottom>
            RUhcfoirheioph irew ophreiwgph jiowehrp
          </Typography> */}
          {props.children}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default PopupView;
