import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import Money from '../../components/Money/Money';

import utils from './utils';

const styles = {
  budgetDetails: {
    marginTop: '20px',
    marginBottom: '50px'
  },
  spent: {
    color: red[400]
  }
};

function budgetDetails(props) {
  const { classes, budget } = props;

  return (
    <Paper className={classes.budgetDetails}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography variant="h5">Total</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="h5">Free</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="h5">Spent</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="h5">Allowed</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="h5">Start date</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="h5">End date</Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>
              <Money value={budget.total} />
            </TableCell>
            <TableCell>
              <Money value={budget.free} />
            </TableCell>
            <TableCell>
              <Money value={budget.transactionsTotal} className={classes.spent} />
            </TableCell>
            <TableCell>
              <Money value={budget.allowed} highlight />
            </TableCell>
            <TableCell>
              {utils.formatDate(budget.startDate)}
            </TableCell>
            <TableCell>
              {utils.formatDate(budget.endDate)}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Paper>
  )
}

export default withStyles(styles)(budgetDetails);