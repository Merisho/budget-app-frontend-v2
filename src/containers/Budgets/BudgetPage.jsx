import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Input from '@material-ui/core/Input';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

import Loading from '../../components/Loading/Loading';
import BackButton from '../../components/Buttons/Back';
import ExpenseItemsTable from './ExpenseItems/ExpenseItemsTable';
import BudgetDetails from './BudgetDetails';
import Service from '../../services/Service';
import DailyChart from './DailyChart';
import CreateExpenseItem from '../../components/Actions/CreateExpenseItem/CreateExpenseItem';

const styles = {
  expenseItemsSeacrh: {
    width: '20%',
    marginRight: '32px'
  },

  expenseItemsHeader: {
    marginBottom: '16px'
  }
};

class BudgetPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      displayedExpenseItems: []
    };

    this.budgetId = props.match.params.id;
  }

  componentDidMount() {
    if (!this.props.budget || this.props.budget.id !== this.budgetId) {
      this.loadBudget(this.budgetId);
    } else {
      this.setState({
        displayedExpenseItems: this.props.budget.expenseItems || []
      });
      this.loaded();
    }
  }

  async loadBudget(budgetId) {
    this.loading();

    const budget = await Service.fetchBudget(budgetId);
    this.setState({
      displayedExpenseItems: budget.expenseItems || []
    });

    this.props.setBudget(budget);

    this.loaded();
  }

  loading() {
    this.setState({ loading: true });
  }

  loaded() {
    this.setState({ loading: false });
  }

  searchExpenseItems(query) {
    const q = query.toLowerCase();
    const expenseItems = this.props.budget.expenseItems.filter(i => i.name.toLowerCase().includes(q));
    this.setState({
      displayedExpenseItems: expenseItems
    });
  }

  expenseItemCreated = expenseItem => {
    this.props.showSuccess(`Expense item "${expenseItem.name}" has been created`);
    this.loadBudget(this.budgetId);
  }

  expenseItemDeleted = expenseItem => {
    this.props.showSuccess(`Expense item "${expenseItem.name}" has been deleted`);
    this.loadBudget(this.budgetId);
  }

  expenseItemEdited = expenseItem => {
    this.props.showSuccess(`Expense item "${expenseItem.name}" has been edited`);
    this.loadBudget(this.budgetId);
  }

  handleError = errMessage => {
    this.props.showError(errMessage);
  }

  render() {
    const { budget, classes } = this.props;
    let budgetView = null;
    if (budget) {
      budgetView = (
        <div>
          <Typography variant="h2" gutterBottom>
            {budget.name}
          </Typography>
          <Typography color="textSecondary">
            {budget.description}
          </Typography>

          <BudgetDetails budget={budget} />

          <DailyChart budget={budget} />

          <div className={classes.expenseItemsHeader}>
            <Typography variant="h4" gutterBottom>
              Expense Items
            </Typography>
            <Input type="text" placeholder="Search" className={classes.expenseItemsSeacrh} onChange={event => this.searchExpenseItems(event.target.value)} />
            <CreateExpenseItem budgetId={this.budgetId} created={this.expenseItemCreated} />
          </div>
          <ExpenseItemsTable
            items={this.state.displayedExpenseItems}
            expenseItemDeleted={this.expenseItemDeleted}
            expenseItemEdited={this.expenseItemEdited}
            onError={this.handleError} />
        </div>
      );
    }

    return (
      <div>
        <BackButton target="/budgets">Back to Budgets</BackButton>

        <Loading inProgress={this.state.loading}>
          {budgetView}
        </Loading>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    budget: state.currentBudget
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setBudget: budget => dispatch({ type: 'SET_CURRENT_BUDGET', payload: { budget } }),
    createExpenseItem: expenseItem => dispatch({ type: 'CREATE_EXPENSE_ITEM', payload: { expenseItem } }),
    deleteExpenseItem: expenseItemId => dispatch({ type: 'DELETE_EXPENSE_ITEM', payload: { expenseItemId } }),
    editExpenseItem: (expenseItemId, expenseItem) => dispatch({ type: 'EDIT_EXPENSE_ITEM', payload: { expenseItemId, expenseItem } }),
    showError: message => dispatch({ type: 'SHOW_ERROR', payload: { message } }),
    showSuccess: message => dispatch({ type: 'SHOW_SUCCESS', payload: { message } })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withStyles(styles)(BudgetPage)));