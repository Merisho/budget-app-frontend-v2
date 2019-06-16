import React from 'react';

import ConfirmationDialog from '../../../components/Dialogs/ConfirmationDialog';

function DeleteExpenseItemConfirmation(props) {
  return (
    <ConfirmationDialog
      variant="danger"
      title={`Are you sure you want to delete expense item ${props.expenseItemName}?`}
      description="All transactions will be deleted!"
      {...props}
    />
  );
}

export default DeleteExpenseItemConfirmation;
