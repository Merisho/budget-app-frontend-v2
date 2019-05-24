import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputAdornment from '@material-ui/core/InputAdornment';

function addExpenseItemForm(props) {
  const [total, setTotal] = React.useState('100');

  function totalChanged(e) {
    setTotal(formatDigits(e.target.value.replace(/\,/g, '')));
  }

  return (
    <Dialog open={props.open} onClose={props.handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Create Expense Item</DialogTitle>
      <DialogContent>
      <TextField
          autoFocus
          id="name"
          margin="dense"
          label="Name"
          type="text"
          variant="outlined"
          fullWidth
        />
        <TextField
          id="total"
          margin="dense"
          label="Total"
          type="text"
          variant="outlined"
          value={total}
          onChange={totalChanged}
          InputProps={{
            startAdornment: <InputAdornment position="start">₴</InputAdornment>,
          }}
          fullWidth
        />
        <TextField
          id="description"
          margin="dense"
          label="Description"
          type="text"
          variant="outlined"
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleClose} color="primary">Cancel</Button>
        <Button onClick={props.handleClose} color="primary">Create</Button>
      </DialogActions>
    </Dialog>
  );
}

function formatDigits(n) {
  const str = n.toString();
  if (str.length <= 3) {
      return str;
  }

  const mod = str.length % 3;
  let formatted = str.slice(0, mod);
  for (let i = mod; i <= str.length - 3; i += 3) {
      if (formatted !== '') {
          formatted += ',';
      }

      formatted += str.slice(i, i + 3);
  }

  return formatted;
}

export default addExpenseItemForm;