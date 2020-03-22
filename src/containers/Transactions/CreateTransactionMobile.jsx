import React from 'react';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import DoneIcon from '@material-ui/icons/Done';
import Loading from '../../components/Loading/Loading';

import Service from '../../services/Service';
import Money from '../../components/Money/Money';
import CreateTransactionForm from '../../components/Forms/Transaction/CreateTransactionForm';
import {
  globalMessages as globalMessagesActions
} from '../../store/actions';
import { Typography } from '@material-ui/core';

const styles = theme => ({
  select: {
    marginTop: 50,
    width: '100%',
  },

  itemStat: {
    marginTop: 10,
  },

  form: {
    marginTop: 30,
  },

  createBtn: {
    width: '100%',
    height: 50,
    marginTop: 20,
    color: theme.palette.secondaryText.main
  },

  sharedBudgetCaption: {
    marginLeft: 10
  }
});

function AddTransactionMobile(props) {
  const [budgets, setBudgets] = React.useState([]);
  const [selectedBudget, setSelectedBudget] = React.useState({id: ''});
  const [selectedExpenseItem, setSelectedExpenseItem] = React.useState({id: ''});
  const [loading, setLoading] = React.useState(false);
  let getFormData = () => {};
  let resetForm = () => {};
  
  React.useEffect(() => {
    (async () => {
      setLoading(true);

      const budgets = await Service.fetchActiveUserBudgets(props.user.id);
      setBudgets(budgets);

      if (budgets.length > 0) {
        const budget = budgets[0];
        setSelectedBudget(budget);

        if (budget.expenseItems && budget.expenseItems.length > 0) {
          setSelectedExpenseItem(budget.expenseItems[0]);
        }
      }

      setLoading(false);
    })()
  }, [props.user.id]);

  function handleBudgetChange(e) {
    const budget = budgets.filter(b => b.id === e.target.value)[0];
    setSelectedBudget(budget);

    if (budget && budget.expenseItems && budget.expenseItems.length > 0) {
      setSelectedExpenseItem(budget.expenseItems[0]);
    }
  }

  function handleExpenseItemChange(e) {
    const item = (selectedBudget.expenseItems || []).filter(i => i.id === e.target.value)[0];
    setSelectedExpenseItem(item);
  }

  async function createTransaction() {
    const data = getFormData();
    if (!data) {
      return;
    }

    setLoading(true);

    try {
      await Service.addTransaction({
        name: data.name,
        total: data.total,
        description: data.description,
        expenseItemID: selectedExpenseItem.id,
        creationDate: data.creationDate
      });

      props.showSuccess('Created successfully');
    } catch(err) {
      console.error(err);
      props.showError('Error. Please contact the developer');
    }

    resetForm();

    setLoading(false);
  }

  const {classes} = props;
  return (
    <Loading inProgress={loading}>
      <FormControl className={classes.select}>
        <InputLabel shrink id="select-budget-label">
          Budget
        </InputLabel>
        <Select value={selectedBudget.id} onChange={handleBudgetChange} labelid="select-budget-label">
        {budgets.map(b => {
          return (
            <MenuItem value={b.id} key={b.id}>
              {b.name}
              {(b.owner.id === props.user.id ? null : <Typography variant="caption" className={classes.sharedBudgetCaption}>(shared by {b.owner.login})</Typography>)}
            </MenuItem>
          );
        })}
        </Select>
      </FormControl>

      <FormControl className={classes.select}>
        <InputLabel shrink id="select-item-label">
          Expense item
        </InputLabel>
        <Select value={selectedExpenseItem.id} onChange={handleExpenseItemChange} labelid="select-item-label">
          {(selectedBudget.expenseItems || []).map(i => <MenuItem value={i.id} key={i.id}>{i.name}</MenuItem>)}
        </Select>
      </FormControl>     
      <div className={classes.itemStat}>
        Allowed: <Money value={selectedExpenseItem.total || 0} highlight />
      </div>
      <div className={classes.itemStat}>
        Spent: <Money value={selectedExpenseItem.transactionsTotal || 0} />
      </div>
      {selectedExpenseItem.id ? (
        <CreateTransactionForm className={classes.form}>{(getData, reset) => {
          getFormData = getData;
          resetForm = reset;
        }}</CreateTransactionForm>
      ) : null}
      <div>
        <Button onClick={createTransaction} variant="contained" color="secondary" className={classes.createBtn}>
          <DoneIcon fontSize="large" />
        </Button>
      </div>
    </Loading>
  );
}

const mapStateToProps = state => {
  return {
    user: state.user
  };
};
const mapDispatchToProps = dispatch => ({
  showSuccess: message => dispatch(globalMessagesActions.showSuccess(message)),
  showError: message => dispatch(globalMessagesActions.showError(message)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(AddTransactionMobile));
