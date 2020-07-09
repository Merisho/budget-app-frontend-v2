import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';
import Input from '@material-ui/core/Input';
import { withStyles } from '@material-ui/core/styles';

import Service from '../../services/Service';
import Loading from '../../components/Loading/Loading';
import BackButton from '../../components/Buttons/Back';
import CreateTransaction from '../../components/Actions/Transaction/CreateTransaction';
import TransactionsTable from './Transactions/TransactionsTable';
import ExpenseItemDetails from './ExpenseItemDetails';
import {
  expenseItem as expenseItemActions,
  globalMessages as globalMessagesActions,
  budget as budgetActions,
} from '../../store/actions';

const styles = {
  transactionSearch: {
    width: '20%',
    marginRight: '32px'
  }
};

class ExpenseItemPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      displayedTransactions: []
    };

    this.expenseItemId = this.props.match.params.id;
  }

  componentDidMount() {
    if (!this.props.expenseItem) {
      this.loadExpenseItem(this.expenseItemId);
    } else {
      this.setState({
        displayedTransactions: this.props.expenseItem.transactions
      });
      this.loaded();
    }
  }

  async loadExpenseItem(id) {
    this.loading();

    const expenseItem = await Service.fetchExpenseItem(id);
    this.props.loadExpenseItem(expenseItem);
    const transactions = expenseItem.transactions || [];
    this.setState({
      displayedTransactions: transactions.sort((t1, t2) => new Date(t2.creationDate) - new Date(t1.creationDate))
    });

    this.loaded();
  }

  handleTransactionCreate = transaction => {
    this.props.showSuccess(`Transaction "${transaction.name}" has been created`);
    this.loadExpenseItem(this.expenseItemId);
    this.props.outdateCurrentBudget(this.props.expenseItem.budgetID);
  }

  loading() { 
    this.setState({ loading: true });
  }

  loaded() {
    this.setState({ loading: false });
  }

  handleTransactionDelete = transaction => {
    this.props.showSuccess(`Transaction "${transaction.name}" has been deleted`);
    this.loadExpenseItem(this.expenseItemId);
    this.props.outdateCurrentBudget(this.props.expenseItem.budgetID);
  }

  handleTransactionEdit = transaction => {
    this.props.showSuccess(`Transaction "${transaction.name}" has been edited`);
    this.loadExpenseItem(this.expenseItemId);
    this.props.outdateCurrentBudget(this.props.expenseItem.budgetID);
  }

  handleError = errMessage => {
    this.props.showError(errMessage);
  }

  searchTransactions = query => {
    const q = query.toLowerCase();
    const transactions = this.props.expenseItem.transactions.filter(t => t.name.toLowerCase().includes(q));
    this.setState({
      displayedTransactions: transactions
    });
  }

  render() {
    let expenseItemView = null;
    if (this.props.expenseItem) {
      expenseItemView = (
        <div>
          <BackButton target={'/budgets/' + this.props.expenseItem.budgetID}>To Budget</BackButton>

          <Typography variant="h2">{this.props.expenseItem.name}</Typography>
          <Typography color="textSecondary">
            {this.props.expenseItem.description}
          </Typography>

          <ExpenseItemDetails expenseItem={this.props.expenseItem} />

          <br />

          <Input type="text" placeholder="Search" className={this.props.classes.transactionSearch} onChange={event => this.searchTransactions(event.target.value)} />
          <CreateTransaction expenseItem={this.props.expenseItem} onCreate={this.handleTransactionCreate} />
          
          <TransactionsTable
            transactions={this.state.displayedTransactions}
            onDelete={this.handleTransactionDelete}
            onEdit={this.handleTransactionEdit}
            onError={this.handleError}
          />
        </div>
      );
    }

    return (
      <Loading inProgress={this.state.loading}>
        {expenseItemView}
      </Loading>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { id } = ownProps.match.params;

  return {
    expenseItem: state.expenseItem.all[id]
  };
};
const mapDispatchToProps = dispatch => ({
  loadExpenseItem: expenseItem => dispatch(expenseItemActions.loadExpenseItem(expenseItem)),
  showSuccess: message => dispatch(globalMessagesActions.showSuccess(message)),
  showError: message => dispatch(globalMessagesActions.showError(message)),
  outdateCurrentBudget: budgetId => dispatch(budgetActions.outdateCurrentBudget(budgetId))
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ExpenseItemPage));