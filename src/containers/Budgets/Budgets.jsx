import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';

import BudgetTile from './BudgetTile';
import Loading from '../../components/Loading/Loading';
import Service from '../../services/Service';
import CreateBudget from '../../components/Actions/CreateBudget/CreateBudget';

const styles = theme => ({
  actionBar: {
    marginBottom: '32px'
  },
  search: {
    margin: '0 32px 0 0'
  }
});

class Budgets extends Component {
  constructor(props) {
    super(props);

    this.state = {
      displayedBudgets: []
    };
  }

  static getDerivedStateFromProps(props, state) {
    return {
      ...state,
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
      const budgets = await Service.fetchAllUserBudgets(this.props.user.id);
      this.setState({
        displayedBudgets: budgets
      });

      this.props.setAllBudgets(budgets);
    }
  }

  searchBudget(query) {
    this.setState({
      displayedBudgets: this.props.budgets.filter(b => b.name.includes(query))
    });
  }

  handleBudgetCreated = budget => {
    this.props.createBudget(budget);
    this.props.showSuccess(`Budget "${budget.name}" has been created`);
  }

  budgetDeleted = budget => {
    this.props.deleteBudget(budget.id);
    this.props.showSuccess(`Budget "${budget.name}" has been deleted`);
  }

  budgetEdited = budget => {
    this.props.editBudget(budget.id, budget);
    this.props.showSuccess(`Budget "${budget.name}" has been edited`);
  }

  budgetTileError = errMessage => {
    this.props.showError(errMessage);
  }

  isNotCurrentBudget = budget => {
    return !this.isCurrentBudget(budget);
  }

  isCurrentBudget = budget => {
    const now = new Date();
    const start = new Date(budget.startDate);
    const end = new Date(budget.endDate);
  
    return now >= start && now < end;
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Loading inProgress={!this.props.budgets}>
          <div className={classes.actionBar}>
            <Input type="text" placeholder="Search" onChange={event => this.searchBudget(event.target.value)} className={classes.search} />
            <CreateBudget user={this.props.user} created={this.handleBudgetCreated} />
          </div>
          <Typography variant="h2">Active</Typography>
          {this.state.displayedBudgets.filter(this.isCurrentBudget).map(budget => {
            return <BudgetTile budget={budget} key={budget.id} deleted={this.budgetDeleted} edited={this.budgetEdited} onError={this.budgetTileError} />
          })}
          <Typography variant="h2">Inactive</Typography>
          {this.state.displayedBudgets.filter(this.isNotCurrentBudget).map(budget => {
            return <BudgetTile budget={budget} key={budget.id} deleted={this.budgetDeleted} edited={this.budgetEdited} onError={this.budgetTileError} />
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
  setAllBudgets: budgets => dispatch({ type: 'SET_ALL_BUDGETS', payload: { budgets } }),
  createBudget: budget => dispatch({ type: 'CREATE_BUDGET', payload: { budget } }),
  editBudget: (budgetId, budget) => dispatch({ type: 'EDIT_BUDGET', payload: { budgetId, budget } }),
  deleteBudget: budgetId => dispatch({ type: 'DELETE_BUDGET', payload: { budgetId } }),
  showError: message => dispatch({ type: 'SHOW_ERROR', payload: { message } }),
  showSuccess: message => dispatch({ type: 'SHOW_SUCCESS', payload: { message } })
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Budgets));