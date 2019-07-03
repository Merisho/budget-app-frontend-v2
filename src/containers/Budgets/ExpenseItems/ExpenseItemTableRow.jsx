import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Link, withRouter } from 'react-router-dom';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

import Money from '../../../components/Money/Money';
import DeleteExpenseItemConfirmation from './DeleteExpenseItemConfirmation';
import EditExpenseItemForm from '../../../components/Forms/ExpenseItem/EditExpenseItemForm';

const styles = theme => ({
  deleteItem: theme.actionIcons.delete,
  editItem: theme.actionIcons.edit
});

function ExpenseItemTableRow(props) {
  const { expenseItem, classes } = props;
  const [ confirmDeletion, setConfirmDeletion ] = React.useState(false);
  const [ openEditForm, setOpenEditForm ] = React.useState(false);

  function handleEdit(editedExpenseItem) {
    props.onEdit(editedExpenseItem);
    setOpenEditForm(false);
  }

  function handleDelete(expenseItem) {
    props.onDelete(expenseItem);
    setConfirmDeletion(false);
  }

  return (
    <>
      <TableRow>
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
          <DeleteForeverIcon onClick={() => setConfirmDeletion(true)} className={classes.deleteItem} />
          <EditIcon onClick={() => setOpenEditForm(true)} className={classes.editItem}/>
        </TableCell>
      </TableRow>
      <DeleteExpenseItemConfirmation
        open={confirmDeletion}
        handleCancel={() => setConfirmDeletion(false)}
        handleOK={() => handleDelete(props.expenseItem)}
        expenseItemName={props.expenseItem.name}
      />
      <EditExpenseItemForm expenseItem={expenseItem} open={openEditForm} onEdit={handleEdit} onDiscard={() => setOpenEditForm(false)} />
    </>
  );
}

ExpenseItemTableRow.propTypes = {
  expenseItem: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired
};

export default withRouter(withStyles(styles)(ExpenseItemTableRow));
