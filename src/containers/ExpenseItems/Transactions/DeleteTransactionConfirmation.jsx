import React from 'react';
import PropTypes from 'prop-types';

import ConfirmationDialog from '../../../components/Dialogs/ConfirmationDialog';

function DeleteExpenseItemConfirmation(props) {
  return (
    <ConfirmationDialog
      variant="danger"
      title={`Are you sure you want to delete transaction ${props.transactionName}?`}
      description="Transaction will be deleted forever"
      {...props}
    />
  );
}

DeleteExpenseItemConfirmation.propTypes = {
  transactionName: PropTypes.string.isRequired
};

export default DeleteExpenseItemConfirmation;
