import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import PropTypes from 'prop-types';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, DateTimePicker } from '@material-ui/pickers';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';

import MoneyField from '../../Money/MoneyField';

const styles = {
  dateField: {
    width: '100%'
  }
};

function EditTransactionForm(props) {
  const [total, setTotal] = React.useState(props.transaction.total);
  const [name, setName] = React.useState(props.transaction.name);
  const [creationDate, setCreationDate] = React.useState(props.transaction.creationDate);
  const [description, setDescription] = React.useState(props.transaction.description || '');
  const [nameInvalid, setNameInvalid] = React.useState(false);
  const [totalInvalid, setTotalInvalid] = React.useState(false);

  function create() {
    setNameInvalid(!name);
    setTotalInvalid(!total);

    if (!name || !total) {
      return;
    }

    props.onEdit({
      name,
      total,
      description,
      creationDate
    });
  }

  return (
    <Dialog open={props.open} onClose={props.onClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Edit Transaction</DialogTitle>
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
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container justify="flex-start">
              <DateTimePicker
                margin="normal"
                required
                id="date"
                label="Date"
                value={creationDate}
                onChange={setCreationDate}
                className={props.classes.dateField}
                disableFuture
              />
            </Grid>
          </MuiPickersUtilsProvider>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onClose} color="primary">Discard</Button>
        <Button onClick={create} color="primary">Apply</Button>
      </DialogActions>
    </Dialog>
  );
}

EditTransactionForm.propTypes = {
  transaction: PropTypes.object.isRequired,
  onEdit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool
};

export default withStyles(styles)(EditTransactionForm);
