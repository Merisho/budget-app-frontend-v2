import React from 'react';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';

import Service from '../../services/Service';
import Money from '../../components/Money/Money';

const styles = {
  select: {
    marginTop: 50,
    width: '100%',
  },

  itemStat: {
    marginTop: 10,
  },

  createForm: {
    marginTop: 30,
  }
};

function addTransactionMobile(props) {
  const [budgets, setBudgets] = React.useState([]);
  const [selectedBudget, setSelectedBudget] = React.useState({id: ''});
  const [selectedExpenseItem, setSelectedExpenseItem] = React.useState({id: ''});
  
  React.useEffect(() => {
    (async () => {
      const budgets = await Service.fetchActiveUserBudgets(props.user.id);
      setBudgets(budgets);

      if (budgets.length > 0) {
        const budget = budgets[0];
        setSelectedBudget(budget);

        if (budget.expenseItems && budget.expenseItems.length > 0) {
          setSelectedExpenseItem(budget.expenseItems[0]);
        }
      }
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

  const {classes} = props;
  return (
    <div>
      <FormControl className={classes.select}>
        <InputLabel shrink id="select-budget-label">
          Budget
        </InputLabel>
        <Select value={selectedBudget.id} onChange={handleBudgetChange} labelid="select-budget-label">
          {budgets.map(b => <MenuItem value={b.id} key={b.id}>{b.name}</MenuItem>)}
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
        <form className={classes.createForm}>
          form
        </form>
      ) : null}
    </div>
  );
}

const mapStateToProps = state => {
  return {
    user: state.user
  };
};
const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(addTransactionMobile));
