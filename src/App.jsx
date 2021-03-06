import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import withRoot from './withRoot';
import Navigation from './components/Navigation/Navigation';
import Dashboard from './containers/Dashboard/Dashboard';
import Budgets from './containers/Budgets/Budgets';
import BudgetPage from './containers/Budgets/BudgetPage';
import ExpenseItemPage from './containers/ExpenseItems/ExpenseItemPage';
import CreateTransactionMobile from './containers/Transactions/CreateTransactionMobile';
import StatusSnackbar from './components/Snackbars/StatusSnackbar';
import withAuth from './higherOrderComponents/withAuth';
import { globalMessages as globalMessagesActions } from './store/actions';

const styles = theme => ({
  root: {
    display: 'flex',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    height: '100vh',
    overflow: 'auto',
  }
});

class App extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <BrowserRouter>
          <Navigation topOffset={64} />

          <main className={classes.content}>
            <Switch>
              <Redirect from="/" to="/dashboard" exact />
              <Route path="/dashboard" component={Dashboard} exact />
              <Route path="/budgets" component={Budgets} exact />
              <Route path="/budgets/:id" component={BudgetPage} exact />
              <Route path="/budgets/expenseitem/:id" component={ExpenseItemPage} exact />
              <Route path="/addtransaction" component={CreateTransactionMobile} exact />
              <Route render={() => <h1>Not Found</h1>} />
            </Switch>
          </main>
        </BrowserRouter>

        <StatusSnackbar variant="error" message={this.props.errorMessage} open={this.props.showError} handleClose={this.props.hideError} />
        <StatusSnackbar variant="success" message={this.props.successMessage} open={this.props.showSuccess} handleClose={this.props.hideSuccess} />
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  errorMessage: state.globalMessages.errorMessage,
  showError: state.globalMessages.showError,
  successMessage: state.globalMessages.successMessage,
  showSuccess: state.globalMessages.showSuccess
});
const mapDispatchToProps = dispatch => ({
  hideError: () => dispatch(globalMessagesActions.hideError()),
  hideSuccess: () => dispatch(globalMessagesActions.hideSuccess())
});

export default connect(mapStateToProps, mapDispatchToProps)(
  withAuth(
    withRoot(
      withStyles(styles)(App)
    )
  )
);
