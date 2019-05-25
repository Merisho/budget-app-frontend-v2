import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Input from '@material-ui/core/Input';
import { withRouter } from 'react-router-dom';

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
      budget: null,
      displayedExpenseItems: [],
      budgetId: ''
    };
  }

  static getDerivedStateFromProps(props) {
    return {
      budgetId: props.match.params.id
    };
  }

  componentDidMount() {
    this.loadBudget(this.state.budgetId);
  }

  async loadBudget(budgetId) {
    const res = await Service.fetchBudget(budgetId);
    this.setState({
      budget: res.data.budget,
      displayedExpenseItems: res.data.budget.expenseItems
    });
  }

  searchExpenseItems(query) {
    const expenseItems = this.state.budget.expenseItems.filter(i => i.name.includes(query));
    this.setState({
      displayedExpenseItems: expenseItems
    });
  }

  expenseItemCreated = () => {
    this.loadBudget(this.state.budgetId);
  }

  render() {
    const { budget } = this.state;
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
          <ExpenseItems items={this.state.displayedExpenseItems} budgetId={this.props.match.params.id} expenseItemCreated={this.expenseItemCreated} />
        </div>
      );
    }

    return (
      <div>
        <BackButton target="/budgets">Back to Budgets</BackButton>

        <Loading inProgress={!this.state.budget}>
          {budgetView}
        </Loading>
      </div>
    );
  }
}

export default withRouter(BudgetPage);