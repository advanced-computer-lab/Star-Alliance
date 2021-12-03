import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const PopupView = (props) => {
  let { cancelCB } = props;
  const handleClose = () => {
    props.setshowDialog(false);
    if (cancelCB) cancelCB();
  };

  return (
    <>
      <Dialog open={props.showDialog} onClose={handleClose} fullWidth>
        <DialogTitle>{props.title}</DialogTitle>
        <DialogContent>{props.children}</DialogContent>
        <DialogActions>
          {props.customActionButtons ? (
            props.customActionButtons
          ) : (
            <Button onClick={handleClose}>Close</Button>
          )}
        </DialogActions>
      </Dialog>
    </>
  );
};

export default PopupView;
