import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import KeyboardBackspace from '@material-ui/icons/KeyboardBackspace';
import { withRouter, Link } from 'react-router-dom';

import Loading from '../../components/Loading/Loading';
import ExpenseItems from './ExpenseItems/ExpenseItems';
import BudgetDetails from './BudgetDetails';
import BudgetService from '../../services/Budget';
import DailyChart from './DailyChart';

const styles = {
  budgetDetails: {
    marginTop: '20px',
    marginBottom: '50px'
  },
  backBtn: {
    textDecoration: 'none',
    display: 'block',
    marginBottom: '24px'
  }
};

class BudgetPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      budget: null,
      displayedExpenseItems: []
    };
  }

  componentDidMount() {
    this.loadBudget(this.props.match.params.id);
  }

  async loadBudget(budgetId) {
    const res = await BudgetService.fetchBudget(budgetId);
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

  render() {
    const { classes } = this.props;

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
          <ExpenseItems items={this.state.displayedExpenseItems} />
        </div>
      );
    }

    return (
      <div>
        <Link to="/budgets" className={classes.backBtn}>
          <Button variant="contained">
            <KeyboardBackspace />
            &nbsp;
            Back to Budgets
          </Button>
        </Link>
        <Loading inProgress={!this.state.budget}>
          {budgetView}
        </Loading>
      </div>
    );
  }
}

export default withRouter(withStyles(styles)(BudgetPage));