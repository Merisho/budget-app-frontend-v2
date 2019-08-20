import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';

import BudgetTile from './BudgetTile';
import Loading from '../../components/Loading/Loading';
import Service from '../../services/Service';
import CreateBudget from '../../components/Actions/CreateBudget/CreateBudget';
import { globalMessages as globalMessagesActions } from '../../store/actions';

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
      displayedBudgets: [],
      loading: true
    };

    this.budgets = [];
  }

  componentDidMount() {
    this.loadBudgets();
  }

  async loadBudgets() {
    if (!this.props.user.id) {
      throw new Error('No user');
    }

    this.setState({
      loading: true
    });

    this.budgets = await Service.fetchAllUserBudgetPreviews(this.props.user.id) || [];

    this.setState({
      loading: false,
      displayedBudgets: [ ...this.budgets ]
    });
}

  searchBudget(query) {
    this.setState({
      displayedBudgets: this.budgets.filter(b => b.name.includes(query))
    });
  }

  handleBudgetCreated = budget => {
    this.loadBudgets();
    this.props.showSuccess(`Budget "${budget.name}" has been created`);
  }

  budgetDeleted = budget => {
    this.loadBudgets();
    this.props.showSuccess(`Budget "${budget.name}" has been deleted`);
  }

  budgetEdited = budget => {
    this.loadBudgets();
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
        <Loading inProgress={this.state.loading}>
          <div className={classes.actionBar}>
            <Input type="text" placeholder="Search" onChange={event => this.searchBudget(event.target.value)} className={classes.search} />
            <CreateBudget user={this.props.user} created={this.handleBudgetCreated} />
          </div>
          <Typography variant="h2">Active</Typography>
          {this.state.displayedBudgets.filter(this.isCurrentBudget).map(budget => {
            return <BudgetTile budget={budget} key={budget.id} deleted={this.budgetDeleted} edited={this.budgetEdited} onError={this.budgetTileError} />
          })}
          <Typography variant="h2">History</Typography>
          {this.state.displayedBudgets.filter(this.isNotCurrentBudget).map(budget => {
            return <BudgetTile budget={budget} key={budget.id} deleted={this.budgetDeleted} edited={this.budgetEdited} onError={this.budgetTileError} />
          })}
        </Loading>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  };
};
const mapDispatchToProps = dispatch => ({
  showError: message => dispatch(globalMessagesActions.showError(message)),
  showSuccess: message => dispatch(globalMessagesActions.showSuccess(message))
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Budgets));