import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import CreateTransactionForm from '../Forms/Transaction/CreateTransactionForm';

function CreateTransactionDialog(props) {
  let getFormData = () => {};
  
  function create() {
    const data = getFormData();
    if (data) {
      props.handleCreate(data);
    }
  }

  return (
    <Dialog open={props.open} onClose={props.handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Create Transaction</DialogTitle>
      <DialogContent>
        <CreateTransactionForm>{getData => getFormData = getData}</CreateTransactionForm>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleClose} color="primary">Cancel</Button>
        <Button onClick={create} color="primary">Create</Button>
      </DialogActions>
    </Dialog>
  );
}

export default CreateTransactionDialog;
