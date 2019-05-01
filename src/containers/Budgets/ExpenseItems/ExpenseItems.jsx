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

import Money from '../../../components/Money/Money';

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
  }
};

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
              <TableCell className={classes.actionsCell}>Actions</TableCell>
              <TableCell className={classes.descriptionCell}>Description</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.props.items.map(i => (
              <TableRow key={i.id}>
                <TableCell>
                  <Checkbox checked={!!this.state.selectedItems[i.id]} onChange={(event, checked) => this.setSelectState(i.id, checked)} />
                </TableCell>
                <TableCell>{i.name}</TableCell>
                <TableCell>
                  <Money value={i.total} />
                </TableCell>
                <TableCell>
                  <Money value={i.transactionsTotal} />
                </TableCell>
                <TableCell>
                  <Money value={i.total - i.transactionsTotal} highlight />
                </TableCell>
                <TableCell>
                  <DeleteForever color="error" />
                </TableCell>
                <TableCell>{i.description}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

export default withStyles(styles)(ExpenseItems);
