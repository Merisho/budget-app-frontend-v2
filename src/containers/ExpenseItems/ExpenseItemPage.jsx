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
    if (!this.props.expenseItem || this.props.expenseItem.id !== this.expenseItemId) {
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
    this.props.setExpenseItem(expenseItem);
    this.setState({
      displayedTransactions: expenseItem.transactions
    });

    this.loaded();
  }

  handleTransactionCreate = () => {
    this.loadExpenseItem(this.expenseItemId);
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
  }

  handleTransactionEdit = transaction => {
    this.props.showSuccess(`Transaction "${transaction.name}" has been edited`);
    this.loadExpenseItem(this.expenseItemId);
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

const mapStateToProps = state => ({
  expenseItem: state.currentExpenseItem
});
const mapDispatchToProps = dispatch => ({
  setExpenseItem: expenseItem => dispatch({ type: 'SET_CURRENT_EXPENSE_ITEM', payload: { expenseItem } }),
  showSuccess: message => dispatch({ type: 'SHOW_SUCCESS', payload: { message } }),
  showError: message => dispatch({ type: 'SHOW_ERROR', payload: { message } }),
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ExpenseItemPage));