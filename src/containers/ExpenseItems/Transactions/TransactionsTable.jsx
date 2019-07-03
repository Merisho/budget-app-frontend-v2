import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import TransactionTableRow from './TransactionTableRow';
import Service from '../../../services/Service';

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
    width: '35%'
  },
  actionsCell: {
    width: '10%'
  }
};

function TransactionsTable(props) {
  const { classes } = props;

  async function handleDelete(transaction) {
    try {
      await Service.deleteTransaction(transaction.id);
      props.onDelete(transaction);
    } catch(err) {
      console.error(err);
      props.onError('An error occured. Please try again later');
    }
  }

  async function handleEdit(id, data) {
    try {
      const editedTransaction = await Service.updateTransaction(id, data);
      props.onEdit(editedTransaction);
    } catch(err) {
      console.error(err);
      props.onError('An error occured. Please try again');
    }
  }

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell className={classes.nameCell}>Name</TableCell>
            <TableCell className={classes.totalCell}>Total</TableCell>
            <TableCell className={classes.dateCell}>Date</TableCell>
            <TableCell className={classes.descriptionCell}>Description</TableCell>
            <TableCell className={classes.actionsCell}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.transactions && props.transactions.map(transaction => (
            <TransactionTableRow key={transaction.id} transaction={transaction} onDelete={handleDelete} onEdit={editedTransaction => handleEdit(transaction.id, editedTransaction)} />
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}

TransactionsTable.propTypes = {
  transactions: PropTypes.array,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onError: PropTypes.func.isRequired
};

export default withStyles(styles)(TransactionsTable);
