import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import PropTypes from 'prop-types';

import MoneyField from '../../Money/MoneyField';

function CreateExpenseItemForm(props) {
  const [total, setTotal] = React.useState(props.expenseItem.total);
  const [name, setName] = React.useState(props.expenseItem.name);
  const [description, setDescription] = React.useState(props.expenseItem.description || '');
  const [nameInvalid, setNameInvalid] = React.useState(false);
  const [totalInvalid, setTotalInvalid] = React.useState(false);

  function edit() {
    setNameInvalid(!name);
    setTotalInvalid(!total);

    if (!name || !total) {
      return;
    }

    props.onEdit({
      name,
      total,
      description
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
          <MoneyField
            id="total"
            required
            error={totalInvalid}
            margin="dense"
            label="Total"
            type="text"
            variant="outlined"
            defaultValue={total}
            onChange={setTotal}
            currencyPrefix="₴"
            fullWidth
          />
          <TextField
            id="description"
            margin="dense"
            label="Description"
            type="text"
            variant="outlined"
            value={description}
            onChange={e => setDescription(e.target.value)}
            fullWidth
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onDiscard} color="primary">Discard</Button>
        <Button onClick={edit} color="primary">Apply</Button>
      </DialogActions>
    </Dialog>
  );
}

CreateExpenseItemForm.propTypes = {
  expenseItem: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDiscard: PropTypes.func.isRequired
};

export default CreateExpenseItemForm;
