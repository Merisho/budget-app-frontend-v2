import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputAdornment from '@material-ui/core/InputAdornment';

function CreateExpenseItemForm(props) {
  const [total, setTotal] = React.useState('100');
  const [name, setName] = React.useState('');
  const [descr, setDescr] = React.useState('');
  const [nameInvalid, setNameInvalid] = React.useState(false);
  const [totalInvalid, setTotalInvalid] = React.useState(false);

  function totalChanged(e) {
    setTotal(formatDigits(e.target.value.replace(/,/g, '')));
  }

  function create() {
    setNameInvalid(!name);
    setTotalInvalid(!total);

    if (!name || !total) {
      return;
    }

    props.handleCreate({
      name,
      total: prepareTotal(total),
      descr
    });
  }

  return (
    <Dialog open={props.open} onClose={props.handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Create Expense Item</DialogTitle>
      <DialogContent>
        <form>
          <TextField
            autoFocus
            required
            error={nameInvalid}
            id="name"
            margin="dense"
            label="Name"
            type="text"
            variant="outlined"
            value={name}
            onChange={e => setName(e.target.value)}
            fullWidth
          />
          <TextField
            id="total"
            required
            error={totalInvalid}
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
            value={descr}
            onChange={e => setDescr(e.target.value)}
            fullWidth
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleClose} color="primary">Cancel</Button>
        <Button onClick={create} color="primary">Create</Button>
      </DialogActions>
    </Dialog>
  );
}

function formatDigits(n) {
  const str = Math.abs(n).toString();

  const mod = str.length % 3;
  let formatted = str.slice(0, mod);
  for (let i = mod; i <= str.length - 3; i += 3) {
      if (formatted !== '') {
          formatted += ',';
      }

      formatted += str.slice(i, i + 3);
  }

  if (n < 0) {
      formatted = '-' + formatted;
  }

  return formatted;
}

function prepareTotal(total) {
  return total.toString().replace(/,/g, '');
}

export default CreateExpenseItemForm;