import React from 'react';
import Button from '@material-ui/core/Button';

import CreateExpenseItemForm from '../../Forms/ExpenseItem/CreateExpenseItemForm';
import Service from '../../../services/Service';

function CreateExpenseItem(props) {
  const [ formOpen, setFormOpenState ] = React.useState(false);

  function open() {
    setFormOpenState(true);
  }

  function close() {
    setFormOpenState(false);
  }

  async function create(data) {
    close();
    const item = await Service.createExpenseItem(props.budgetId, {
      name: data.name,
      total: +data.total,
      description: data.descr
    });

    props.created && props.created(item);
  }

  return (
    <React.Fragment>
      <Button variant="contained" color="primary" onClick={open}>Create Expense Item</Button>
      <CreateExpenseItemForm open={formOpen} handleClose={close} handleCreate={create} />
    </React.Fragment>
  );
}

export default CreateExpenseItem;