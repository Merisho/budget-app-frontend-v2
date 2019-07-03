import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import DeleteForever from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Money from '../../../components/Money/Money';
import DateValue from '../../../components/Values/Date';
import DeleteTransactionConfirmation from './DeleteTransactionConfirmation';
import EditTransactionForm from '../../../components/Forms/Transaction/EditTransactionForm';

const styles = theme => ({
  delete: theme.actionIcons.delete,
  edit: theme.actionIcons.edit
});

function TransactionTableRow(props) {
  const {transaction} = props;
  const [confirmDeletion, setConfirmDeletion] = React.useState(false);
  const [openEditForm, setOpenEditForm] = React.useState(false);

  function handleDelete() {
    props.onDelete(transaction);
    setConfirmDeletion(false);
  }

  function handleEdit(editedTransaction) {
    props.onEdit(editedTransaction);
    setOpenEditForm(false);
  }

  return (
    <>
      <TableRow>
        <TableCell>{transaction.name}</TableCell>
        <TableCell>
          <Money value={transaction.total} />
        </TableCell>
        <TableCell>
          <DateValue>{transaction.creationDate}</DateValue>
        </TableCell>
        <TableCell>{transaction.description}</TableCell>
        <TableCell>
          <DeleteForever onClick={() => setConfirmDeletion(true)} className={props.classes.delete} />
          <EditIcon onClick={() => setOpenEditForm(true)} className={props.classes.edit} />
        </TableCell>
      </TableRow>
      <DeleteTransactionConfirmation
        transactionName={transaction.name}
        open={confirmDeletion}
        handleCancel={() => setConfirmDeletion(false)}
        handleOK={handleDelete}
      />
      <EditTransactionForm
        transaction={transaction}
        onEdit={handleEdit}
        onClose={() => setOpenEditForm(false)}
        open={openEditForm}
      />
    </>
  );
}

TransactionTableRow.propTypes = {
  transaction: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired
};

export default withStyles(styles)(TransactionTableRow);
