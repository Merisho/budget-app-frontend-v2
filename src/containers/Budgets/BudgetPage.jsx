import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Input from '@material-ui/core/Input';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Loading from '../../components/Loading/Loading';
import BackButton from '../../components/Buttons/Back';
import ExpenseItems from './ExpenseItems/ExpenseItems';
import BudgetDetails from './BudgetDetails';
import Service from '../../services/Service';
import DailyChart from './DailyChart';

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
      const res = await Service.fetchBudget(budgetId);
      this.setState({
        displayedExpenseItems: res.data.budget.expenseItems
      });

      this.props.setBudget(res.data.budget);
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
    const { budget } = this.props;
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

          <div>
            <Typography variant="h4" gutterBottom>
              Expense Items
            </Typography>
            <Input type="text" placeholder="Search" onChange={event => this.searchExpenseItems(event.target.value)} />
          </div>
          <ExpenseItems items={this.state.displayedExpenseItems} budgetId={this.budgetId} expenseItemCreated={this.expenseItemCreated} />
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(BudgetPage));