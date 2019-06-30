import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';

import Service from '../../../services/Service';
import ExpenseItemTableRow from './ExpenseItemTableRow';

const styles = theme => ({
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
  spentCell: {
    width: '10%'
  },
  allowedCell: {
    width: '10%'
  },
  actionsCell: {
    width: '10%'
  },
  descriptionCell: {
    width: '40%'
  },
  addItem: {
    background: theme.palette.secondary.main,
    color: theme.palette.secondaryText.white
  },
  approveNewItem: {
    color: theme.palette.action.approve,
    cursor: 'pointer'
  }
});

class ExpenseItems extends Component {
  constructor(props) {
    super(props);

    this.state = {
      confirmDeletion: false,
      expenseItemToDelete: null
    };
  }

  acceptDeletion = async expenseItem => {
    try {
      await Service.deleteExpenseItem(expenseItem.id);
      this.props.expenseItemDeleted && this.props.expenseItemDeleted(expenseItem);
    } catch(err) {
      console.error(err);
      this.props.onError('An error occured. Please try again');
    }
  }

  handleEdit = async (id, data) => {
    try {
      const editedExpenseItem = await Service.updateExpenseItem(id, data);
      this.props.expenseItemEdited && this.props.expenseItemEdited(editedExpenseItem);
    } catch(err) {
      console.error(err);
      this.props.onError('An error occured. Please try again');
    }
  }

  render() {
    const { classes } = this.props;

    return (
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell className={classes.nameCell}>Name</TableCell>
              <TableCell className={classes.totalCell}>Total</TableCell>
              <TableCell className={classes.spentCell}>Spent</TableCell>
              <TableCell className={classes.allowedCell}>Allowed</TableCell>
              <TableCell className={classes.descriptionCell}>Description</TableCell>
              <TableCell className={classes.actionsCell}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.props.items && this.props.items.length ? this.props.items.map(expenseItem => (
              <ExpenseItemTableRow
                key={expenseItem.id}
                expenseItem={expenseItem}
                onDelete={this.acceptDeletion}
                onEdit={editedItem => this.handleEdit(expenseItem.id, editedItem)} />
            )) : null}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

ExpenseItems.propTypes = {
  items: PropTypes.array.isRequired,
  onError: PropTypes.func.isRequired,
  expenseItemDeleted: PropTypes.func,
  expenseItemEdited: PropTypes.func
};

export default withStyles(styles)(ExpenseItems);
