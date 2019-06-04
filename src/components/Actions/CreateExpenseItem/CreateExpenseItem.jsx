import React from 'react';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import CreateExpenseItemForm from './CreateExpenseItemForm';
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
    const item = await Service.createExpenseItem(props.budgetId, {
      name: data.name,
      total: +data.total * 100,
      description: data.descr
    });

    close();
    props.created && props.created(item.data.addExpenseItem);
  }

  return (
    <React.Fragment>
      <Fab color="primary" aria-label="Add" onClick={open}>
        <AddIcon />
      </Fab>
      <CreateExpenseItemForm open={formOpen} handleClose={close} handleCreate={create} />
    </React.Fragment>
  );
}

export default CreateExpenseItem;