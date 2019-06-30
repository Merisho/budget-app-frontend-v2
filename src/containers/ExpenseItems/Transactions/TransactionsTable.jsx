import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import DeleteForever from '@material-ui/icons/DeleteForever';

import Money from '../../../components/Money/Money';
import DateValue from '../../../components/Values/Date';

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
            <TableRow key={transaction.id}>
              <TableCell>{transaction.name}</TableCell>
              <TableCell>
                <Money value={transaction.total} />
              </TableCell>
              <TableCell>
                <DateValue>{transaction.creationDate}</DateValue>
              </TableCell>
              <TableCell>{transaction.description}</TableCell>
              <TableCell>
                <DeleteForever color="error" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}

TransactionsTable.propTypes = {
  transactions: PropTypes.array
};

export default withStyles(styles)(TransactionsTable);
