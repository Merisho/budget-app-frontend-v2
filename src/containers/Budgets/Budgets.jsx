import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import Input from '@material-ui/core/Input';

import BudgetTile from './BudgetTile';
import Loading from '../../components/Loading/Loading';
import BudgetService from '../../services/Budget';

const styles = theme => ({
  search: {
    marginBottom: '32px'
  },
  budgetLink: {
    overflow: 'hidden'
  }
});

class Budgets extends Component {
  constructor(props) {
    super(props);

    this.state = {
      budgets: [],
      displayedBudgets: []
    };
  }

  componentDidMount() {
    this.loadBudgets();
  }

  async loadBudgets() {
    const res = await BudgetService.fetchAllUserBudgets('2fa434ad-5611-4e1e-8aa4-61616577bc72');
    this.setState({
      budgets: res.data.user.budgets,
      displayedBudgets: res.data.user.budgets
    });
  }

  searchBudget(query) {
    this.setState({
      displayedBudgets: this.state.budgets.filter(b => b.name.includes(query))
    });
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Loading inProgress={this.state.budgets.length === 0}>
          <div className={classes.search}>
            <Input type="text" placeholder="Search" onChange={event => this.searchBudget(event.target.value)} />
          </div>
          {this.state.displayedBudgets.map(b => {
            return (
              <Link to={`/budgets/${b.id}`} key={b.id} className={classes.budgetLink}>
                <BudgetTile data={b} />
              </Link>
            );
          })}
        </Loading>
      </div>
    );
  }
}

export default withStyles(styles)(Budgets);