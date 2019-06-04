import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputAdornment from '@material-ui/core/InputAdornment';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const styles = {
  grid: {
    width: '100%'
  }
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_NAME':
      return {
        ...state,
        name: action.payload.name
      };
    case 'SET_TOTAL':
      return {
        ...state,
        total: action.payload.total
      };
    case 'SET_DESCRIPTION':
      return {
        ...state,
        description: action.payload.description
      };
    case 'SET_START_DATE':
      return {
        ...state,
        startDate: action.payload.startDate
      };
    case 'SET_END_DATE':
      return {
        ...state,
        endDate: action.payload.endDate
      };
    default:
      return state;
  }
}

function CreateExpenseItemForm(props) {
  const [ state, dispatch ] = React.useReducer(reducer, {
    name: '',
    total: 1000,
    description: '',
    startDate: new Date(),
    endDate: new Date()
  });

  function changeName(e) {
    dispatch({
      type: 'SET_NAME',
      payload: {
        name: e.target.value
      }
    });
  }

  function changeTotal(e) {
    dispatch({
      type: 'SET_TOTAL',
      payload: {
        total: e.target.value.replace(/,/g, '')
      }
    });
  }

  function changeDescription(e) {
    dispatch({
      type: 'SET_DESCRIPTION',
      payload: {
        description: e.target.value
      }
    });
  }

  function changeStartDate(startDate) {
    dispatch({
      type: 'SET_START_DATE',
      payload: { startDate }
    });
  }

  function changeEndDate(endDate) {
    dispatch({
      type: 'SET_END_DATE',
      payload: { endDate }
    });
  }

  function create() {

  }

  return (
    <Dialog open={props.open} onClose={props.handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Create Budget</DialogTitle>
      <DialogContent>
        <form>
          <TextField
            autoFocus
            required
            id="name"
            margin="dense"
            label="Name"
            type="text"
            variant="outlined"
            value={state.name}
            onChange={changeName}
            fullWidth
          />
          <TextField
            id="total"
            required
            margin="dense"
            label="Total"
            type="text"
            variant="outlined"
            value={state.total}
            onChange={changeTotal}
            InputProps={{
              startAdornment: <InputAdornment position="start">₴</InputAdornment>,
            }}
            fullWidth
          />
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container className={props.classes.grid} justify="space-between">
              <DatePicker
                margin="normal"
                id="start-date"
                label="Start date"
                value={state.startDate}
                onChange={changeStartDate}
              />
              <DatePicker
                margin="normal"
                id="end-date"
                label="End date"
                value={state.endDate}
                onChange={changeEndDate}
              />
            </Grid>
          </MuiPickersUtilsProvider>
          <TextField
            id="description"
            margin="dense"
            label="Description"
            type="text"
            variant="outlined"
            value={state.description}
            onChange={changeDescription}
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

export default withStyles(styles)(CreateExpenseItemForm);