import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import DeleteForever from '@material-ui/icons/DeleteForever';
import { withStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import { Link, withRouter } from 'react-router-dom';
import CreateExpenseItem from '../../../components/Actions/CreateExpenseItem/CreateExpenseItem';

import Money from '../../../components/Money/Money';

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
  checkCell: {
    width: '5%'
  },
  descriptionCell: {
    width: '35%'
  },
  deleteItem: {
    color: theme.palette.action.delete,
    cursor: 'pointer'
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
      selectedItems: {}
    };
  }

  setSelectStateForAll(selected) {
    const selectedItems = {};

    if (selected) {
      this.props.items.forEach(i => {
        selectedItems[i.id] = true;
      });
    }

    this.setState({selectedItems});
  }

  setSelectState(id, selected) {
    const selectedItems = {...this.state.selectedItems};
    if (selected) {
      selectedItems[id] = selected;
    } else {
      delete selectedItems[id];
    }

    this.setState({selectedItems});
  }

  expenseItemCreated = () => {
    this.props.expenseItemCreated && this.props.expenseItemCreated();
  }

  render() {
    const { classes } = this.props;

    return (
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell className={classes.checkCell}>
                <Checkbox onChange={(event, checked) => this.setSelectStateForAll(checked)} />
              </TableCell>
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
              <TableRow key={expenseItem.id}>
                <TableCell>
                  <Checkbox checked={!!this.state.selectedItems[expenseItem.id]}
                    onChange={(event, checked) => this.setSelectState(expenseItem.id, checked)} />
                </TableCell>
                <TableCell>
                  <Link to={'/budgets/expenseitem/' + expenseItem.id}>
                    {expenseItem.name}
                  </Link>
                </TableCell>
                <TableCell>
                  <Money value={expenseItem.total} />
                </TableCell>
                <TableCell>
                  <Money value={expenseItem.transactionsTotal} />
                </TableCell>
                <TableCell>
                  <Money value={expenseItem.total - expenseItem.transactionsTotal} highlight />
                </TableCell>
                <TableCell>{expenseItem.description}</TableCell>
                <TableCell>
                  <DeleteForever className={classes.deleteItem} />
                </TableCell>
              </TableRow>
            )) : null}
            <TableRow>
              <TableCell></TableCell>
              <TableCell>
                <CreateExpenseItem budgetId={this.props.budgetId} created={this.expenseItemCreated} />
              </TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

export default withRouter(withStyles(styles)(ExpenseItems));
