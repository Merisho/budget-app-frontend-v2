import React from 'react';
import TextField from '@material-ui/core/TextField';
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
  const [total, setTotal] = React.useState(0);
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [creationDate, setCreationDate] = React.useState(new Date());
  const [nameInvalid, setNameInvalid] = React.useState(false);
  const [totalInvalid, setTotalInvalid] = React.useState(false);

  function gatherFormData() {
    setNameInvalid(!name);
    setTotalInvalid(!total);

    if (!name || !total) {
      return;
    }

    return {
      name,
      total,
      description,
      creationDate
    };
  }

  function reset() {
    setTotal(0);
    setName('');
    setDescription('');
    setCreationDate(new Date());
    setNameInvalid(false);
    setTotalInvalid(false);
  }

  if (typeof props.children === 'function') {
    props.children(gatherFormData, reset);
  }

  return (
    <form className={props.className}>
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
  );
}

export default withStyles(styles)(CreateTransactionForm);
