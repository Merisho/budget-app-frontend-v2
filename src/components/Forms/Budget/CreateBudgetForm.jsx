import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import MoneyField from '../../Money/MoneyField';

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
    case 'SET_NAME_INVALID_STATUS':
      return {
        ...state,
        invalidName: action.payload.invalid
      };
    case 'SET_TOTAL_INVALID_STATUS':
      return {
        ...state,
        invalidTotal: action.payload.invalid
      };
    case 'SET_START_DATE_INVALID_STATUS':
      return {
        ...state,
        invalidStartDate: action.payload.invalid
      };
    case 'SET_END_DATE_INVALID_STATUS':
      return {
        ...state,
        invalidEndDate: action.payload.invalid
      };
    default:
      return state;
  }
}

function CreateBudgetForm(props) {
  const [ state, dispatch ] = React.useReducer(reducer, {
    name: '',
    total: 1000,
    description: '',
    startDate: null,
    endDate: null,
    invalidName: false,
    invalidTotal: false,
    invalidStartDate: false,
    invalidEndDate: false
  });

  function changeName(e) {
    dispatch({
      type: 'SET_NAME',
      payload: {
        name: e.target.value
      }
    });
  }

  function changeTotal(value) {
    dispatch({
      type: 'SET_TOTAL',
      payload: {
        total: value
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
    dispatch({
      type: 'SET_NAME_INVALID_STATUS',
      payload: {
        invalid: !state.name
      }
    });
    dispatch({
      type: 'SET_TOTAL_INVALID_STATUS',
      payload: {
        invalid: !state.total
      }
    });
    dispatch({
      type: 'SET_START_DATE_INVALID_STATUS',
      payload: {
        invalid: !state.startDate
      }
    });
    dispatch({
      type: 'SET_END_DATE_INVALID_STATUS',
      payload: {
        invalid: !state.endDate
      }
    });

    if (state.startDate >= state.endDate) {
      dispatch({
        type: 'SET_START_DATE_INVALID_STATUS',
        payload: {
          invalid: true
        }
      });
    }

    if (!state.name || !state.total || !state.startDate || !state.endDate || state.startDate > state.endDate) {
      return;
    }

    props.handleCreate && props.handleCreate({
      name: state.name,
      total: state.total,
      description: state.description,
      startDate: state.startDate,
      endDate: state.endDate
    });
  }

  return (
    <Dialog open={props.open} onClose={props.handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Create Budget</DialogTitle>
      <DialogContent>
        <form>
          <TextField
            autoFocus
            required
            error={state.invalidName}
            id="name"
            margin="dense"
            label="Name"
            type="text"
            variant="outlined"
            value={state.name}
            onChange={changeName}
            fullWidth
          />
          <MoneyField
            id="total"
            required
            error={state.invalidTotal}
            margin="dense"
            label="Total"
            type="text"
            variant="outlined"
            defaultValue={state.total}
            onChange={changeTotal}
            currencyPrefix="₴"
            fullWidth
          />
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container className={props.classes.grid} justify="space-between">
              <DatePicker
                margin="normal"
                required
                error={state.invalidStartDate}
                id="start-date"
                label="Start date"
                value={state.startDate}
                onChange={changeStartDate}
              />
              <DatePicker
                margin="normal"
                required
                error={state.invalidEndDate}
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

export default withStyles(styles)(CreateBudgetForm);