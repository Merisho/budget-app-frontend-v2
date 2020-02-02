import React from 'react';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types'

import CreateTransactionDialog from '../../Dialogs/CreateTransactionDialog';
import Service from '../../../services/Service';

function CreateTransaction(props) {
  const [ formOpen, setFormOpenState ] = React.useState(false);

  function close() {
    setFormOpenState(false);
  }

  async function create(data) {
    const transaction = await Service.addTransaction({
      name: data.name,
      total: data.total,
      description: data.description,
      expenseItemID: props.expenseItem.id,
      creationDate: data.creationDate
    });

    close();
    props.onCreate(transaction);
  }
  
  return (
    <React.Fragment>
      <Button variant="contained" color="primary" onClick={() => setFormOpenState(true)}>Create Transaction</Button>
      <CreateTransactionDialog open={formOpen} handleClose={close} handleCreate={create} />
    </React.Fragment>
  );
}

CreateTransaction.propTypes = {
  onCreate: PropTypes.func.isRequired,
  expenseItem: PropTypes.object.isRequired
}

export default CreateTransaction;
