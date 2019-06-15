import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Input from '@material-ui/core/Input';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

import Loading from '../../components/Loading/Loading';
import BackButton from '../../components/Buttons/Back';
import ExpenseItems from './ExpenseItems/ExpenseItems';
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

  static getDerivedStateFromProps(props, state) {
    if (props.budget && props.budget.expenseItems) {
      return {
        ...state,
        displayedExpenseItems: props.budget.expenseItems
      };
    }

    return {
      ...state
    };
  }

  componentDidMount() {
    this.loadBudget(this.budgetId);
  }

  async loadBudget(budgetId) {
    if (!this.props.budget || this.props.budget.id !== budgetId) {
      const budget = await Service.fetchBudget(budgetId);
      this.setState({
        displayedExpenseItems: budget.expenseItems
      });

      this.props.setBudget(budget);
    }

    this.setState({ loading: false });
  }

  searchExpenseItems(query) {
    const expenseItems = this.props.budget.expenseItems.filter(i => i.name.includes(query));
    this.setState({
      displayedExpenseItems: expenseItems
    });
  }

  expenseItemCreated = expenseItem => {
    this.props.createExpenseItem(expenseItem);
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
          <ExpenseItems items={this.state.displayedExpenseItems} />
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
    createExpenseItem: expenseItem => dispatch({ type: 'CREATE_EXPENSE_ITEM', payload: { expenseItem } })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withStyles(styles)(BudgetPage)));