import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { withStyles } from '@material-ui/core/styles';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const styles = theme => ({
  deletionInfo: {
    color: theme.palette.action.delete
  }
});

function DeleteBudgetConfirmation(props) {
  return (
    <Dialog
      open={props.open}
      TransitionComponent={Transition}
      keepMounted
      onClose={props.handleCancel}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle id="alert-dialog-slide-title">{`Are you sure you want to delete budget ${props.budgetName}?`}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description" className={props.classes.deletionInfo}>
          All transactions and expense item will be deleted!
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleCancel} color="primary">
          Cancel
        </Button>
        <Button onClick={props.handleOK} color="primary">
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default withStyles(styles)(DeleteBudgetConfirmation);