import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
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

function CreateTransactionForm(props) {
  const [total, setTotal] = React.useState(100);
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [creationDate, setCreationDate] = React.useState(new Date());
  const [nameInvalid, setNameInvalid] = React.useState(false);
  const [totalInvalid, setTotalInvalid] = React.useState(false);

  function create() {
    setNameInvalid(!name);
    setTotalInvalid(!total);

    if (!name || !total) {
      return;
    }

    props.handleCreate({
      name,
      total,
      description,
      creationDate
    });
  }

  return (
    <Dialog open={props.open} onClose={props.handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Create Transaction</DialogTitle>
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
        <Button onClick={props.handleClose} color="primary">Cancel</Button>
        <Button onClick={create} color="primary">Create</Button>
      </DialogActions>
    </Dialog>
  );
}

export default withStyles(styles)(CreateTransactionForm);
