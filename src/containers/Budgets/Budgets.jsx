import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import Input from '@material-ui/core/Input';
import { connect } from 'react-redux';

import BudgetTile from './BudgetTile';
import Loading from '../../components/Loading/Loading';
import Service from '../../services/Service';

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
      displayedBudgets: props.budgets || []
    };
  }

  componentDidMount() {
    this.loadBudgets();
  }

  async loadBudgets() {
    if (!this.props.user.id) {
      throw new Error('No user');
    }

    if (!this.props.budgets) {
      const res = await Service.fetchAllUserBudgets(this.props.user.id);
      this.setState({
        displayedBudgets: res.data.user.budgets
      });

      this.props.setAllBudgets(res.data.user.budgets);
    }
  }

  searchBudget(query) {
    this.setState({
      displayedBudgets: this.props.budgets.filter(b => b.name.includes(query))
    });
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Loading inProgress={!this.props.budgets}>
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

const mapStateToProps = state => ({
  user: state.user,
  budgets: state.allBudgets
});
const mapDispatchToProps = dispatch => ({
  setAllBudgets: budgets => dispatch({ type: 'SET_ALL_BUDGETS', payload: { budgets } })
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Budgets));