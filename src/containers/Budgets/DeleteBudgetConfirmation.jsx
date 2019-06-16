import React from 'react';

import ConfirmationDialog from '../../components/Dialogs/ConfirmationDialog';

function DeleteBudgetConfirmation(props) {
  return (
    <ConfirmationDialog
      variant="danger"
      title={`Are you sure you want to delete budget ${props.budgetName}?`}
      description="All transactions and expense items will be deleted!"
      {...props}
    />
  );
}

export default DeleteBudgetConfirmation;