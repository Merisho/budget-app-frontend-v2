import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { withStyles } from '@material-ui/core/styles';

import Service from '../../services/Service';
import Loading from '../../components/Loading/Loading';
import Money from '../../components/Money/Money';
import BackButton from '../../components/Buttons/Back';

const styles = {
  root: {
    width: '100%'
  },
  table: {
    minWidth: 700,
  },
  nameCell: {
    width: '20%'
  },
  totalCell: {
    width: '10%'
  },
  dateCell: {
    width: '25%'
  },
  descriptionCell: {
    width: '45%'
  }
};

class ExpenseItemPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      expenseItem: null
    };
  }

  componentDidMount() {
    this.loadExpenseItem(this.props.match.params.id);
  }

  async loadExpenseItem(id) {
    const res = await Service.fetchExpenseItem(id);
    this.setState({
      expenseItem: res.data.expenseItem
    });
  }

  render() {
    const { classes } = this.props;

    let expenseItemView = null;
    if (this.state.expenseItem) {
      expenseItemView = (
        <div>
          <BackButton target={'/budgets/' + this.state.expenseItem.budgetID}>To Budget</BackButton>
          
          <Paper className={classes.root}>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell className={classes.nameCell}>Name</TableCell>
                  <TableCell className={classes.totalCell}>Total</TableCell>
                  <TableCell className={classes.dateCell}>Date</TableCell>
                  <TableCell className={classes.descriptionCell}>Description</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.expenseItem.transactions.map(transaction => (
                  <TableRow key={transaction.id}>
                    <TableCell>{transaction.name}</TableCell>
                    <TableCell>
                      <Money value={transaction.total} />
                    </TableCell>
                    <TableCell>{transaction.creationDate}</TableCell>
                    <TableCell>{transaction.description}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </div>
      );
    }

    return (
      <Loading inProgress={!this.state.expenseItem}>
        {expenseItemView}
      </Loading>
    );
  }
}

export default withRouter(withStyles(styles)(ExpenseItemPage));