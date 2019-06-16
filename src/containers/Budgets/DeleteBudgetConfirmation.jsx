import React from 'react';

import DeleteConfirmationDialog from '../../components/Dialogs/DeleteConfirmationDialog';

function DeleteBudgetConfirmation(props) {
  return (
    <DeleteConfirmationDialog
      variant="danger"
      title={`Are you sure you want to delete budget ${props.budgetName}?`}
      description="All transactions and expense items will be deleted!"
      {...props}
    />
  );
}

export default DeleteBudgetConfirmation;