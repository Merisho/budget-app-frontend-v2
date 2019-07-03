import React from 'react';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import TableBody from '@material-ui/core/TableBody';
import PropTypes from 'prop-types';

import Money from '../../components/Money/Money';

function ExpenseItemDetails(props) {
  const { expenseItem } = props;

  return (
    <Paper>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography variant="h5">Total</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="h5">Spent</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="h5">Allowed</Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>
              <Money value={expenseItem.total} />
            </TableCell>
            <TableCell>
              <Money value={expenseItem.transactionsTotal} />
            </TableCell>
            <TableCell>
              <Money value={expenseItem.total - expenseItem.transactionsTotal} highlight />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Paper>
  );
}

ExpenseItemDetails.propTypes = {
  expenseItem: PropTypes.object.isRequired
};

export default ExpenseItemDetails;
